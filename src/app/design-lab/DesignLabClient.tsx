"use client";

import React, { useMemo, useState } from "react";
import SearchBox from "@/app/common/components/searchBox";
import CocktailCard from "@/app/(home)/cocktailCard";
import IngredientCard, { IngredientCardData } from "@/app/(ingredients)/ingredients/IngredientCard";
import NewIngredientCard from "@/app/(ingredients)/ingredients/NewIngredientCard";
import { uiTokenStyles } from "@/app/(common)/components/uiTokens";
import { dataStateLabels, demoCocktails, demoIngredients, DesignLabState, sampleErrorMessage } from "@/app/design-lab/fixtures";

function filterBySearch<T, K extends keyof T>(items: T[], keyword: string, field: K) {
    if (!keyword) return items;
    return items.filter((item) => String(item[field] ?? "").toLowerCase().includes(keyword.toLowerCase()));
}

function getVisibleItems<T>(state: DesignLabState, items: T[]) {
    if (state === "loading") return [];
    return state === "empty" ? [] : items;
}

function renderSkeleton(count: number) {
    return Array.from({ length: count }, (_, index) => (
        <div
            key={index}
            className="animate-pulse md:w-1/4 w-1/2 p-6 border border-gray-200 rounded-lg bg-gray-100 h-64"
        />
    ));
}

function renderStateMessage(state: DesignLabState, emptyText: string, errorText: string) {
    if (state === "error") return <p className="text-red-500 text-sm mt-2 w-full">{errorText}</p>;
    if (state === "empty") return <p className="text-gray-500 text-sm mt-2 w-full">{emptyText}</p>;
    return null;
}

export default function DesignLabClient() {
    const [cocktailSearch, setCocktailSearch] = useState("");
    const [ingredientSearch, setIngredientSearch] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [newIngredientRequested, setNewIngredientRequested] = useState(false);
    const [cocktailState, setCocktailState] = useState<DesignLabState>("ready");
    const [ingredientState, setIngredientState] = useState<DesignLabState>("ready");

    const filteredCocktails = useMemo(
        () => filterBySearch(demoCocktails, cocktailSearch, "cocktailName"),
        [cocktailSearch]
    );
    const filteredIngredients = useMemo(
        () => filterBySearch(demoIngredients, ingredientSearch, "ingredientName"),
        [ingredientSearch]
    );

    const resolvedCocktailState: DesignLabState =
        cocktailState === "ready" && filteredCocktails.length === 0 ? "empty" : cocktailState;
    const resolvedIngredientState: DesignLabState =
        ingredientState === "ready" && filteredIngredients.length === 0 ? "empty" : ingredientState;

    const visibleCocktails = getVisibleItems(resolvedCocktailState, filteredCocktails);
    const visibleIngredients = getVisibleItems(resolvedIngredientState, filteredIngredients);

    return (
        <main className={uiTokenStyles.layout.section}>
            <section className="p-4 border rounded-xl bg-white shadow-sm">
                <h2 className="text-xl font-semibold mb-4">UI state preview: backend-free mode</h2>
                <button
                    type="button"
                    onClick={() => setIsLogin((prev) => !prev)}
                    className="px-4 py-2 rounded bg-slate-900 text-white text-sm"
                >
                    Login state: {isLogin ? "ON" : "OFF"} (click to toggle)
                </button>
            </section>

            <section>
                <h1 className="text-2xl font-bold mb-2">CocktailCard component</h1>
                <p className="text-sm text-gray-500 mb-4">Search + state cases without backend API</p>
                <SearchBox placeHolder="Search cocktails" setSearchValue={setCocktailSearch} />
                <div className="mt-2 mb-4 flex gap-2 flex-wrap">
                    {(Object.entries(dataStateLabels) as [DesignLabState, string][]).map(([state, label]) => (
                        <button
                            key={state}
                            type="button"
                            onClick={() => setCocktailState(state)}
                            aria-pressed={cocktailState === state}
                            className={`px-3 py-1 rounded text-sm ${cocktailState === state ? "bg-black text-white" : "bg-gray-200"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="mt-4 flex justify-start flex-wrap">
                    {resolvedCocktailState === "loading" && renderSkeleton(2)}
                    {resolvedCocktailState !== "ready" &&
                        renderStateMessage(resolvedCocktailState, "No cocktail sample data.", sampleErrorMessage)}
                    {visibleCocktails.map((cocktail) => (
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
                <h1 className="text-2xl font-bold mb-2">IngredientCard component</h1>
                <p className="text-sm text-gray-500 mb-4">Search + state cases for ingredient cards</p>
                <SearchBox placeHolder="Search ingredients" setSearchValue={setIngredientSearch} />
                <div className="mt-2 mb-4 flex gap-2 flex-wrap">
                    {(Object.entries(dataStateLabels) as [DesignLabState, string][]).map(([state, label]) => (
                        <button
                            key={state}
                            type="button"
                            onClick={() => setIngredientState(state)}
                            aria-pressed={ingredientState === state}
                            className={`px-3 py-1 rounded text-sm ${ingredientState === state ? "bg-black text-white" : "bg-gray-200"}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="mt-4 flex justify-start flex-wrap">
                    {resolvedIngredientState === "loading" && renderSkeleton(3)}
                    {resolvedIngredientState !== "ready" &&
                        renderStateMessage(resolvedIngredientState, "No ingredient sample data.", "Backend is unavailable. Ingredient preview cards are hidden in error state.")}
                    {resolvedIngredientState !== "error" &&
                        visibleIngredients.map((ingredient: IngredientCardData & { id: string }) => (
                            <IngredientCard key={ingredient.id} ingredient={ingredient} size="md:w-1/4 w-1/3" />
                        ))}
                    <NewIngredientCard
                        handleClickNewIngredient={() => setNewIngredientRequested((prev) => !prev)}
                        isLogin={isLogin}
                        onRequestLogin={() => setIsLogin(true)}
                    />
                </div>
                <p className="mt-4 text-sm text-gray-600">
                    New ingredient action: {newIngredientRequested ? "requested" : "standby"}
                </p>
            </section>
        </main>
    );
}
