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

    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error('Error sending ingredients to API:', error);
    throw error;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchData = await sendIngredientsToAPI(ingredients);
        setCocktail(moveCocktailWithOutExcludeIngredient(fetchData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (ingredients.length > 0) {
      fetchData();
    }
  }, [ingredients]);

  return (
    <div className="flex justify-start flex-wrap">
      {cocktail.map((data, index) => {
        return <FitCocktailCard key={index} data={data} />;
      })}
    </div>
  );
}

export default Ingredients
