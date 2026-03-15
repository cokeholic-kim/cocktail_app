"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from "next/navigation"
import { BASE_URL } from '@/app/(common)/common';
import { CocktailFit } from '@/app/(common)/commonProps';
import FitCocktailCard from './fitCocktailCard';
import { isValidListItem, sanitizeText } from '@/app/(common)/securityValidation';

const NO_INPUT_ERROR = "선택한 재료가 없어 추천할 칵테일이 없습니다.";
const NO_RESULT_MESSAGE = "조건에 맞는 칵테일을 찾지 못했습니다.";
const NETWORK_ERROR_MESSAGE = "네트워크 오류로 추천 목록을 불러오지 못했습니다.";

const parseCheckedIngredients = (value: string | null): string[] => {
    if (!value) return [];

    try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        const sanitized = parsed
            .filter((item): item is string => typeof item === "string")
            .filter((item): item is string => isValidListItem(item))
            .map((item) => sanitizeText(item))
            .slice(0, 15);

        return sanitized;
    } catch (error) {
        console.error("Failed to parse checkedIngredients:", error);
        return [];
    }
};

async function sendIngredientsToAPI(ingredientNames: string[]) {
    const jsonData = { myIngredient: ingredientNames };
    try {
        const response = await fetch(`${BASE_URL}/ingredient/getFitCocktailList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            console.error("Error sending ingredients to API:", { status: response.status });
            return { ok: false, error: `HTTP error! status: ${response.status}`, body: [] as CocktailFit[] };
        }

        const responseText = await response.text();
        if (!responseText.trim()) {
            return { ok: false, error: "Empty response", body: [] as CocktailFit[] };
        }

        const responseData = JSON.parse(responseText) as { body?: CocktailFit[] };
        return { ok: true, error: null, body: responseData.body ?? [] };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown fetch error";
        console.error('Error sending ingredients to API:', error);
        return { ok: false, error: message, body: [] as CocktailFit[] };
    }
};

const moveCocktailWithOutExcludeIngredient = (cocktails: CocktailFit[]) => {
    const withExclude: CocktailFit[] = [];
    const withoutExclude: CocktailFit[] = [];

    cocktails.forEach((cocktail) => {
        if (cocktail.excludeIngredient && cocktail.excludeIngredient.length > 0) {
            withExclude.push(cocktail);
        } else {
            withoutExclude.push(cocktail);
        }
    });

    return [...withoutExclude, ...withExclude];
}

function Ingredients() {
    const param = useSearchParams();
    const checkedIngredients = param.get("checkedIngredients");
    const ingredients = useMemo(() => parseCheckedIngredients(checkedIngredients), [checkedIngredients]);

    const [cocktail, setCocktail] = useState<CocktailFit[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (ingredients.length === 0) {
                setCocktail([]);
                setErrorMessage(NO_INPUT_ERROR);
                setLoading(false);
                return;
            }

            setLoading(true);
            setErrorMessage('');

            const { ok, error, body } = await sendIngredientsToAPI(ingredients);
            if (!ok) {
                setErrorMessage(error === "Empty response" ? NO_RESULT_MESSAGE : NETWORK_ERROR_MESSAGE);
                setCocktail([]);
                setLoading(false);
                return;
            }

            if (body.length === 0) {
                setErrorMessage(NO_RESULT_MESSAGE);
                setCocktail([]);
                setLoading(false);
                return;
            }

            setCocktail(moveCocktailWithOutExcludeIngredient(body));
            setLoading(false);
        };
        fetchData();
    }, [ingredients]);

    return (
        <div className="flex justify-start flex-wrap">
            {errorMessage && <p className="w-full m-4 text-sm rounded border border-red-300 bg-red-50 p-3 text-red-700">{errorMessage}</p>}
            {!errorMessage && loading && <p className="w-full m-4 text-sm text-gray-500">추천 칵테일을 불러오는 중...</p>}
            {cocktail.map((data, index) => {
                return <FitCocktailCard key={index} data={data} />;
            })}
        </div>
    );
}

export default Ingredients

