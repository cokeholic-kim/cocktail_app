"use client"

import { useEffect, useState } from "react";
import { Ingredient } from './../../(ingredients)/ingredients/page';
import SimpleIngredientCard from "./SimpleIngredientCard";
import IngredientCard from "@/app/(ingredients)/ingredients/IngredientCard";
import Link from "next/link";

interface ResponseData {
  cocktailName : string,
  includeIngredients  :[],
  excludedIngredients  :[]
}

export interface IngredientChecked extends Ingredient {
  checked?: boolean,
}

function MyIngredientBody({ ingredients }: { ingredients: Ingredient[] }) {
    const [ingredientData,setIngredientData] = useState<IngredientChecked[]>([])
    const [searchValue,setSearchValue] = useState("")
    const [checkedIngredients, setCheckedIngredients] = useState<IngredientChecked[]>([]);

    useEffect(()=> {
      setIngredientData(ingredients)
    },[])

    // const filteredIngredients = ingredientData.filter((ingredient) =>
    //     ingredient.ingredientName.includes(searchValue)
    //   );

    // const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchValue(e.target.value)
    // }

    const handleCheck = (ingredient: IngredientChecked) => {
      setIngredientData((prevIngredientData) =>
        prevIngredientData.map((item) =>
          item.ingredientName === ingredient.ingredientName
            ? { ...item, checked: !item.checked }
            : item
        )
      );

      setCheckedIngredients((prevCheckedIngredients) => {
        const existingIngredient = prevCheckedIngredients.find(
          (item) => item.ingredientName === ingredient.ingredientName
        );
        
        if (existingIngredient) {
          return prevCheckedIngredients.filter((item) => item.ingredientName !== ingredient.ingredientName);
        } else {
          return [...prevCheckedIngredients, ingredient];
        }
      });
    };

    const getIngredientNames = (checkedIngredients: Ingredient[]): string[] => {
      return checkedIngredients.map((ingredient) => ingredient.ingredientName);
    };

    

  return (
    <>
      <nav
        className={`flex justify-between items-center px-6 py-5   w-full z-10 transition-all duration-500 "bg-black"`}
      >
        <input
          className="bg-gray-800 rounded-md text-white px-3 py-2 w-96 focus:outline-none"
          type="text"
          placeholder="재료를 검색해 주세요"
          onChange={(e)=>setSearchValue(e.target.value)}
        />
      </nav>
      <h1>My Ingredient</h1>
      {/* <button className="button" onClick={()=> handleClick}>find cocktail</button> */}
      {checkedIngredients.length > 0 && (
        <Link
          href={{
            pathname: "/myingredients/fitCocktail",
            query: {
              checkedIngredients: JSON.stringify(
                getIngredientNames(checkedIngredients)
              ),
            },
          }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          칵테일 찾기
        </Link>
      )}

      <div className="flex justify-start flex-wrap min-h-28">
        {checkedIngredients.map((ingredient, index) => {
          return <IngredientCard key={index} ingredient={ingredient} />;
        })}
      </div>
      <h1>Not Checked Ingredients</h1>
      <div className="flex justify-start flex-wrap">
      {searchValue === "" ? 
    ingredientData.map((ingredient, index) => (
      <SimpleIngredientCard
        key={index}
        ingredient={ingredient}
        handleCheck={handleCheck}
        checked = {ingredient.checked!}
      />
    ))
  : ingredientData
      .filter((ingredient) =>
        ingredient.ingredientName.includes(searchValue)
      )
      .map((ingredient, index) => (
        <SimpleIngredientCard
          key={index}
          ingredient={ingredient}
          handleCheck={handleCheck}
          checked = {ingredient.checked!}
        />
      ))}
      </div>
    </>
  );
}

export default MyIngredientBody
