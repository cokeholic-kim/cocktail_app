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
    demoStateStories,
    designLabSearchStateMessages,
    designLabStateLabels,
    designLabStateMessages,
    DesignLabState,
    DemoCocktail,
    DemoIngredient,
} from "@/app/design-lab/fixtures";

type DemoViewState<T> = {
    state: DesignLabState;
    items: T[];
    message: string;
};

function filterBySearch<T, K extends keyof T>(items: T[], keyword: string, field: K): T[] {
    if (!keyword) {
        return items;
    }

    const lowerKeyword = keyword.trim().toLowerCase();
    return items.filter((item) => String(item[field] ?? "").toLowerCase().includes(lowerKeyword));
}

function buildDemoView<T>(
    state: DesignLabState,
    items: T[],
    sourceItemCount: number,
    fallbackMessage: string,
    searchEmptyMessage: string
): DemoViewState<T> {
    if (state === "loading") {
        return { state: "loading", items: [], message: "" };
    }

    if (state === "error") {
        return { state: "error", items, message: fallbackMessage };
    }

    if (!items.length) {
        return {
            state: "empty",
            items: [],
            message: sourceItemCount > 0 ? searchEmptyMessage : fallbackMessage,
        };
    }

    return { state, items, message: "" };
}

function getNoticeText(state: DesignLabState, label: string, text: string) {
    if (!text) {
        return `${label}: ${designLabStateMessages[state]}`;
    }

    return `${label}: ${designLabStateMessages[state]} - ${text}`;
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
            {getNoticeText(state, label, text)}
        </p>
    );
}

function StateButtons({
    activeState,
    onChange,
    states,
    ariaPrefix,
}: {
    activeState: DesignLabState;
    states: readonly DesignLabState[];
    onChange: (state: DesignLabState) => void;
    ariaPrefix: string;
}) {
    return (
        <div className="mt-2 mb-4 flex flex-wrap gap-2">
            {states.map((state) => {
                const label = designLabStateLabels[state];

                return (
                    <button
                        key={state}
                        type="button"
                        onClick={() => onChange(state)}
                        aria-pressed={activeState === state}
                        aria-label={`${ariaPrefix} 상태 ${label}`}
                        className={`rounded px-3 py-1 text-sm ${activeState === state ? "bg-black text-white" : "bg-gray-200"}`}
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

function buildSearchMessage(keyword: string, messageSet: typeof designLabSearchStateMessages): string {
    return keyword.trim() ? messageSet.searchResultEmpty : messageSet.sourceEmpty;
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
        () => filterBySearch(cocktailSource.data?.body ?? [], cocktailSearch, "cocktailName"),
        [cocktailSource, cocktailSearch]
    );
    const filteredIngredients = useMemo(
        () => filterBySearch(ingredientSource.data?.body ?? [], ingredientSearch, "ingredientName"),
        [ingredientSource, ingredientSearch]
    );

    const fallbackMessage = "샘플 데이터 조회 실패. 기본 상태로 전환합니다.";
    const cocktailSearchMessage = buildSearchMessage(cocktailSearch, designLabSearchStateMessages);
    const ingredientSearchMessage = buildSearchMessage(ingredientSearch, designLabSearchStateMessages);

    const cocktailView = useMemo(
        () =>
            buildDemoView(
                cocktailState,
                filteredCocktails,
                cocktailSource.data?.body?.length ?? 0,
                cocktailSource.error || fallbackMessage,
                cocktailSearchMessage
            ),
        [cocktailState, filteredCocktails, cocktailSource, cocktailSearchMessage]
    );
    const ingredientView = useMemo(
        () =>
            buildDemoView(
                ingredientState,
                filteredIngredients,
                ingredientSource.data?.body?.length ?? 0,
                ingredientSource.error || fallbackMessage,
                ingredientSearchMessage
            ),
        [ingredientState, filteredIngredients, ingredientSource, ingredientSearchMessage]
    );

    return (
        <section className={uiTokenStyles.layout.section}>
            <section className="rounded-xl border bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">디자인 실험실 상태 샘플</h2>
                <p className="mb-4 text-sm text-gray-500">
                    CocktailCard/IngredientCard 컴포넌트의 기본, 로딩, 에러 상태를 API 없이 확인합니다.
                </p>
                <button
                    type="button"
                    onClick={() => setIsLogin((prev) => !prev)}
                    className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
                >
                    로그인 상태 토글: {isLogin ? "ON" : "OFF"}
                </button>
            </section>

            <section>
                <h1 className="mb-2 text-2xl font-bold">CocktailCard component</h1>
                <p className="mb-4 text-sm text-gray-500">
                    샘플 목록을 기반으로 기본/로딩/에러 상태를 즉시 전환해 보고 카드 출력 흐름을 점검합니다.
                </p>
                <SearchBox placeHolder="CocktailCard 검색" setSearchValue={setCocktailSearch} />
                <StateButtons
                    states={demoStateStories}
                    activeState={cocktailState}
                    onChange={setCocktailState}
                    ariaPrefix="CocktailCard"
                />
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
                <p className="mb-4 text-sm text-gray-500">
                    샘플 재료 목록에서 검색/로딩/에러/빈 상태 메시지를 함께 확인합니다.
                </p>
                <SearchBox placeHolder="IngredientCard 검색" setSearchValue={setIngredientSearch} />
                <StateButtons
                    states={demoStateStories}
                    activeState={ingredientState}
                    onChange={setIngredientState}
                    ariaPrefix="IngredientCard"
                />
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
                    New ingredient 요청 상태: {newIngredientRequested ? "요청됨" : "대기"}
                </p>
            </section>

            <section aria-label="상태 스냅샷 가이드" className="mt-8">
                <h2 className="mb-2 text-xl font-semibold">상태 스냅샷 가이드</h2>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                    <li>{`${dataStateLabels.ready}: 샘플 데이터 정상 출력`}</li>
                    <li>{`${dataStateLabels.loading}: 로딩 스켈레톤 + 안내 메시지`}</li>
                    <li>{`${dataStateLabels.error}: 에러 메시지 + 폴백 처리`}</li>
                    <li>{`${dataStateLabels.empty}: 데이터가 0개인 경우 빈 상태 처리`}</li>
                </ul>
            </section>
        </section>
    );
}
