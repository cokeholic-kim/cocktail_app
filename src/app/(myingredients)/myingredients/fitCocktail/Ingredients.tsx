"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from "next/navigation"
import { BASE_URL } from '@/app/(common)/common';
import { CocktailFit } from '@/app/(common)/commonProps';
import FitCocktailCard from './fitCocktailCard';

const parseCheckedIngredients = (value: string | null): string[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch (error) {
    console.error("Failed to parse checkedIngredients:", error);
    return [];
  }
};

const sendIngredientsToAPI = async (ingredientNames: string[]) => {
  const jsondata = { myIngredient: ingredientNames };
  try {
    const response = await fetch(`${BASE_URL}/ingredient/getFitCocktailList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsondata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.body ?? [];
  } catch (error) {
    console.error('Error sending ingredients to API:', error);
    return [];
  }
};

const moveCocktailWithOutExcludeIngredient = (cocktails: CocktailFit[]) => {
  const withExclude: CocktailFit[] = [];
  const withoutExclude: CocktailFit[] = [];

  cocktails.forEach(cocktail => {
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
        setErrorMessage('');
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage('');

      try {
        const response = await sendIngredientsToAPI(ingredients);
        if (!Array.isArray(response) || response.length === 0) {
          setErrorMessage('조건에 맞는 추천 칵테일이 없거나 백엔드 응답이 없습니다.');
          setCocktail([]);
          return;
        }
        setCocktail(moveCocktailWithOutExcludeIngredient(response));
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('조합 추천을 불러오지 못했습니다. 백엔드가 응답되지 않습니다.');
        setCocktail([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ingredients]);

  return (
    <div className="flex justify-start flex-wrap">
      {errorMessage && <p className="w-full m-4 text-sm rounded border border-red-300 bg-red-50 p-3 text-red-700">{errorMessage}</p>}
      {!errorMessage && loading && <p className="w-full m-4 text-sm text-gray-500">추천 칵테일을 불러오는 중입니다...</p>}
      {cocktail.map((data, index) => {
        return <FitCocktailCard key={index} data={data} />;
      })}
    </div>
  );
}

export default Ingredients
