"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import { BASE_URL } from '@/app/(common)/common';
import { CocktailFit } from '@/app/(common)/commonProps';
import FitCocktailCard from './fitCocktailCard';

function Ingredients() {
    const param = useSearchParams();
    const data = param.get("checkedIngredients")
    const ingredients = JSON.parse(data!);

    const [cocktail, setCocktail] = useState<CocktailFit[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const fetchData = await sendIngredientsToAPI(ingredients);
              setCocktail(fetchData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData()
    },[])

    const sendIngredientsToAPI = async (ingredientNames: string[]) => {
        const jsondata = {myIngredient : ingredientNames}
        const formData = new FormData();
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

  return (
    <div className="flex justify-start flex-wrap">
      {cocktail.map((data, index) => {
        return <FitCocktailCard key={index} data={data} />;
      })}
    </div>
  );
}

export default Ingredients
