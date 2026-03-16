"use client";

import React, { useState } from "react";
import { Ingredient } from "./page";
import IngredientCard from "./IngredientCard";
import NewIngredientCard from "./NewIngredientCard";
import NewIngredientForm from "@/app/(cocktails)/cocktails/(swiperpage)/(newIngredient)/NewIngredientForm";
import SearchBox from "@/app/common/components/searchBox";
import { uiTokenStyles } from "@/app/(common)/components/uiTokens";

function IngredientPageBody({ ingredients }: { ingredients: Ingredient[] }) {
    const [newIngredientPage, setNewIngredientPage] = useState(false);
    const handleClickNewIngredient = () => {
        setNewIngredientPage(!newIngredientPage);
    };
    const [searchValue, setSearchValue] = useState("");

    return (
        <div>
            <SearchBox placeHolder="재료 검색" setSearchValue={setSearchValue} />
            <div className={`${uiTokenStyles.layout.content} mt-4`}>
                {searchValue === ""
                    ? ingredients.map((ingredient: Ingredient, index: number) => {
                          return <IngredientCard key={index} ingredient={ingredient} size={"md:w-1/4 w-1/2"} />;
                      })
                    : ingredients
                          .filter((ingredient) => ingredient.ingredientName.includes(searchValue))
                          .map((ingredient, index) => {
                              return (
                                  <IngredientCard
                                      key={index}
                                      ingredient={ingredient}
                                      size={"md:w-1/4 w-1/2"}
                                  />
                              );
                          })}
                <NewIngredientCard handleClickNewIngredient={handleClickNewIngredient} />
            </div>
            {newIngredientPage ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="relative w-[92%] max-w-4xl shadow-black bg-slate-200 overflow-hidden rounded-lg transition-all duration-500 animate-[fadeIn_400ms_ease-in-out]">
                        <span
                            onClick={() => handleClickNewIngredient()}
                            className="absolute right-5 top-5 cursor-pointer z-40 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                            role="button"
                        >
                            X
                        </span>
                        <div className="p-10 max-h-[75vh] overflow-y-auto">
                            <NewIngredientForm setNewIngredientPage={setNewIngredientPage} />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default IngredientPageBody;
