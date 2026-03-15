"use client";

import React, { useMemo, useState } from "react";
import SearchBox from "@/app/common/components/searchBox";
import CocktailCard from "@/app/(home)/cocktailCard";
import IngredientCard, { IngredientCardData } from "@/app/(ingredients)/ingredients/IngredientCard";
import NewIngredientCard from "@/app/(ingredients)/ingredients/NewIngredientCard";
import { uiTokenStyles } from "@/app/(common)/components/uiTokens";
import {
    dataStateLabels,
    demoCocktails,
    demoIngredients,
    designLabStateMessages,
    DesignLabState,
    sampleErrorMessage,
} from "@/app/design-lab/fixtures";

function filterBySearch<T, K extends keyof T>(items: T[], keyword: string, field: K) {
    if (!keyword) {
        return items;
    }
    return items.filter((item) => String(item[field] ?? "").toLowerCase().includes(keyword.toLowerCase()));
}

function getVisibleItems<T>(state: DesignLabState, items: T[]) {
    if (state === "loading") {
        return [];
    }
    return state === "empty" ? [] : items;
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
    emptyText,
    errorText,
}: {
    state: DesignLabState;
    label: string;
    emptyText: string;
    errorText: string;
}) {
    if (state === "ready") {
        return null;
    }

    const text = state === "error" ? errorText : emptyText;

    return (
        <p className="mt-2 w-full text-sm text-gray-600" role="status" aria-live="polite">
            {`${label}: ${designLabStateMessages[state]} - ${text}`}
        </p>
    );
}

function StateButtons({
    activeState,
    onChange,
}: {
    activeState: DesignLabState;
    onChange: (state: DesignLabState) => void;
}) {
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

    const filteredCocktails = useMemo(() => filterBySearch(demoCocktails, cocktailSearch, "cocktailName"), [cocktailSearch]);
    const filteredIngredients = useMemo(() => filterBySearch(demoIngredients, ingredientSearch, "ingredientName"), [ingredientSearch]);

    const resolvedCocktailState: DesignLabState =
        cocktailState === "ready" && filteredCocktails.length === 0 ? "empty" : cocktailState;
    const resolvedIngredientState: DesignLabState =
        ingredientState === "ready" && filteredIngredients.length === 0 ? "empty" : ingredientState;

    const visibleCocktails = getVisibleItems(resolvedCocktailState, filteredCocktails);
    const visibleIngredients = getVisibleItems(resolvedIngredientState, filteredIngredients);

    return (
        <main className={uiTokenStyles.layout.section}>
            <section className="rounded-xl border bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">UI state preview: backend-free mode</h2>
                <button
                    type="button"
                    onClick={() => setIsLogin((prev) => !prev)}
                    className="rounded bg-slate-900 px-4 py-2 text-sm text-white"
                >
                    Login state: {isLogin ? "ON" : "OFF"} (click to toggle)
                </button>
            </section>

            <section>
                <h1 className="mb-2 text-2xl font-bold">CocktailCard component</h1>
                <p className="mb-4 text-sm text-gray-500">Search + state cases without backend API</p>
                <SearchBox placeHolder="Search cocktails" setSearchValue={setCocktailSearch} />
                <StateButtons activeState={cocktailState} onChange={setCocktailState} />
                <div className={uiTokenStyles.layout.content}>
                    {resolvedCocktailState === "loading" && <SkeletonCard count={2} />}
                    <StateSectionNotice
                        state={resolvedCocktailState}
                        label="CocktailCard"
                        emptyText="검색 결과가 없습니다."
                        errorText={sampleErrorMessage}
                    />
                    {resolvedCocktailState !== "error" &&
                        visibleCocktails.map((cocktail) => (
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
                <p className="mb-4 text-sm text-gray-500">Search + state cases for ingredient cards</p>
                <SearchBox placeHolder="Search ingredients" setSearchValue={setIngredientSearch} />
                <StateButtons activeState={ingredientState} onChange={setIngredientState} />
                <div className={uiTokenStyles.layout.content}>
                    {resolvedIngredientState === "loading" && <SkeletonCard count={3} />}
                    <StateSectionNotice
                        state={resolvedIngredientState}
                        label="IngredientCard"
                        emptyText="검색 결과가 없습니다."
                        errorText="백엔드 연결이 없어 샘플 데이터만 표시됩니다."
                    />
                    {resolvedIngredientState !== "error" &&
                        visibleIngredients.map((ingredient) => (
                            <IngredientCard
                                key={ingredient.id}
                                ingredient={ingredient}
                                size="md:w-1/4 w-1/3"
                            />
                        ))}
                    <NewIngredientCard
                        handleClickNewIngredient={() => setNewIngredientRequested((prev) => !prev)}
                        isLogin={isLogin}
                        onRequestLogin={() => setIsLogin(true)}
                    />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                    New ingredient action: {newIngredientRequested ? "requested" : "standby"}
                </p>
            </section>
        </main>
    );
}
