"use client"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react";
import FitCocktailCard from "./fitCocktailCard";
import { BASE_URL } from "@/app/(common)/common";

export interface CocktailFit{
    cocktailName:string;
    imagePath:string;
    includeIngredients:string[];
    excludeIngredient:string[];
}

function FitCocktail() {
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
    <Suspense fallback={<div>...Loading</div>}>

      <div className="flex justify-start flex-wrap">
          {/* {JSON.stringify(cocktail)} */}
        {
          cocktail.map((data,index) => {
              return <FitCocktailCard key={index} data={data}/>
          })
        }
      </div>
    </Suspense>
  )
}

export default FitCocktail
