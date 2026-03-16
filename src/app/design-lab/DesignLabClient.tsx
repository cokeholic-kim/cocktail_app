"use client";

import React, { useMemo, useState } from "react";
import SearchBox from "@/app/common/components/searchBox";
import CocktailCard from "@/app/(home)/cocktailCard";
import IngredientCard from "@/app/(ingredients)/ingredients/IngredientCard";
import NewIngredientCard from "@/app/(ingredients)/ingredients/NewIngredientCard";
import { uiTokenStyles } from "@/app/(common)/components/uiTokens";
import {
    dataStateLabels,
    demoCocktailResponse,
    demoIngredientResponse,
    designLabStateMessages,
    DesignLabState,
    DemoIngredient,
    DemoCocktail,
} from "@/app/design-lab/fixtures";

type DemoViewState<T> = {
    state: DesignLabState;
    items: T[];
    message: string;
};

function filterBySearch<T, K extends keyof T>(items: T[], keyword: string, field: K) {
    if (!keyword) {
        return items;
    }

    return items.filter((item) =>
        String(item[field] ?? "").toLowerCase().includes(keyword.toLowerCase())
    );
}

function buildDemoView<T>(
    state: DesignLabState,
    items: T[],
    sourceItemCount: number,
    sourceEmptyMessage: string,
    searchEmptyMessage: string
): DemoViewState<T> {
    if (state === "loading") {
        return { state: "loading", items: [], message: "" };
    }

    if (state === "error") {
        return { state: "error", items, message: sourceEmptyMessage };
    }

    if (!items.length) {
        return {
            state: "empty",
            items: [],
            message: sourceItemCount > 0 ? searchEmptyMessage : sourceEmptyMessage,
        };
    }

    return { state, items, message: "" };
}

function SkeletonCard({ count }: { count: number }) {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <div
                    key={index}
                    className="h-64 w-1/2 animate-pulse rounded-lg border border-gray-200 bg-gray-100 p-6 md:w-1/4"
                />
            ))}
        </>
    );
}

function StateSectionNotice({
    state,
    label,
    text,
}: {
    state: DesignLabState;
    label: string;
    text: string;
}) {
    if (state === "ready") {
        return null;
    }

    return (
        <p className="mt-2 w-full text-sm text-gray-600" role="status" aria-live="polite">
            {`${label}: ${designLabStateMessages[state]} - ${text}`}
        </p>
    );
}

function StateButtons({ activeState, onChange }: { activeState: DesignLabState; onChange: (state: DesignLabState) => void }) {
    return (
        <div className="mt-2 mb-4 flex flex-wrap gap-2">
            {(Object.entries(dataStateLabels) as [DesignLabState, string][]).map(([state, label]) => (
                <button
                    key={state}
                    type="button"
                    onClick={() => onChange(state)}
                    aria-pressed={activeState === state}
                    className={`rounded px-3 py-1 text-sm ${activeState === state ? "bg-black text-white" : "bg-gray-200"}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export default function DesignLabClient() {
    const [cocktailSearch, setCocktailSearch] = useState("");
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [newIngredientRequested, setNewIngredientRequested] = useState(false);
    const [cocktailState, setCocktailState] = useState<DesignLabState>("ready");
    const [ingredientState, setIngredientState] = useState<DesignLabState>("ready");

    const cocktailSource = demoCocktailResponse[cocktailState];
    const ingredientSource = demoIngredientResponse[ingredientState];

    const filteredCocktails = useMemo(
        () =>
            filterBySearch(cocktailSource.data?.body ?? [], cocktailSearch, "cocktailName" as keyof DemoCocktail),
        [cocktailSource, cocktailSearch]
    );
    const filteredIngredients = useMemo(
        () =>
            filterBySearch(
                ingredientSource.data?.body ?? [],
                ingredientSearch,
                "ingredientName" as keyof DemoIngredient
            ),
        [ingredientSource, ingredientSearch]
    );

    const cocktailView = useMemo(
        () =>
            buildDemoView(
                cocktailState,
                filteredCocktails,
                cocktailSource.data?.body?.length ?? 0,
                cocktailSource.error || "샘플 데이터 조회 실패. 기본 상태로 전환합니다.",
                cocktailSearch.length > 0 ? "검색 결과가 없습니다." : "샘플 데이터가 없습니다."
            ),
        [cocktailState, filteredCocktails, cocktailSearch, cocktailSource]
    );
    const ingredientView = useMemo(
        () =>
            buildDemoView(
                ingredientState,
                filteredIngredients,
                ingredientSource.data?.body?.length ?? 0,
                ingredientSource.error || "샘플 데이터 조회 실패. 기본 상태로 전환합니다.",
                ingredientSearch.length > 0 ? "검색 결과가 없습니다." : "샘플 데이터가 없습니다."
            ),
        [ingredientState, filteredIngredients, ingredientSearch, ingredientSource]
    );

    return (
        <section className={uiTokenStyles.layout.section}>
            <section className="rounded-xl border bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">UI 컴포넌트 상태 토글(디자인랩 샘플)</h2>
                <button
                    type="button"
                    onClick={() => setIsLogin((prev) => !prev)}
                    className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
                >
                    Login state: {isLogin ? "ON" : "OFF"} (클릭 토글)
                </button>
            </section>

            <section>
                <h1 className="mb-2 text-2xl font-bold">CocktailCard component</h1>
                <p className="mb-4 text-sm text-gray-500">CocktailCard 샘플의 렌더링/상태/검색 동작을 확인합니다.</p>
                <SearchBox placeHolder="CocktailCard 검색" setSearchValue={setCocktailSearch} />
                <StateButtons activeState={cocktailState} onChange={setCocktailState} />
                <div className={uiTokenStyles.layout.content}>
                    {cocktailView.state === "loading" && <SkeletonCard count={2} />}
                    <StateSectionNotice
                        state={cocktailView.state}
                        label="CocktailCard"
                        text={cocktailView.message}
                    />
                    {cocktailView.items.map((cocktail) => (
                        <CocktailCard
                            key={cocktail.id}
                            imagePath={cocktail.imagePath}
                            cocktailName={cocktail.cocktailName}
                            description={cocktail.description}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h1 className="mb-2 text-2xl font-bold">IngredientCard component</h1>
                <p className="mb-4 text-sm text-gray-500">IngredientCard 샘플의 렌더링/상태/검색 동작을 확인합니다.</p>
                <SearchBox placeHolder="IngredientCard 검색" setSearchValue={setIngredientSearch} />
                <StateButtons activeState={ingredientState} onChange={setIngredientState} />
                <div className={uiTokenStyles.layout.content}>
                    {ingredientView.state === "loading" && <SkeletonCard count={3} />}
                    <StateSectionNotice
                        state={ingredientView.state}
                        label="IngredientCard"
                        text={ingredientView.message}
                    />
                    {ingredientView.items.map((ingredient) => (
                        <IngredientCard key={ingredient.id} ingredient={ingredient} size="md:w-1/4 w-1/3" />
                    ))}
                    <NewIngredientCard
                        handleClickNewIngredient={() => setNewIngredientRequested((prev) => !prev)}
                        isLogin={isLogin}
                        onRequestLogin={() => setIsLogin(true)}
                    />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    New ingredient action: {newIngredientRequested ? "요청됨" : "요청 안 함"}
                </p>
            </section>
        </section>
    );
}
