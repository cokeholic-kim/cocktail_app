"use client";

import React, { useState } from "react";
import CocktailCard from "@/app/(home)/cocktailCard";
import AddCocktailCard from "./AddCocktailCard";
import AddCocktailModal from "./AddCocktailModal";
import { Ingredient } from "@/app/(ingredients)/ingredients/page";
import { Cocktail } from "../typeinterface";
import SearchBox from "@/app/common/components/searchBox";
import { uiTokenStyles } from "@/app/(common)/components/uiTokens";

function CocktailPageBody({
    cocktails,
    glass,
    method,
    ingredients,
}: {
    cocktails: Cocktail[];
    glass: string[];
    method: string[];
    ingredients: Ingredient[];
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <SearchBox placeHolder="칵테일 검색" setSearchValue={setSearchValue} />
            <div className={`${uiTokenStyles.layout.content} mt-4`}>
                {searchValue === ""
                    ? cocktails.map((cocktail, index) => (
                          <CocktailCard
                              key={index}
                              imagePath={cocktail.imagePath}
                              cocktailName={cocktail.cocktailName}
                              description={cocktail.description}
                          />
                      ))
                    : cocktails
                          .filter((cocktail) => cocktail.cocktailName.includes(searchValue))
                          .map((cocktail, index) => (
                              <CocktailCard
                                  key={index}
                                  imagePath={cocktail.imagePath}
                                  cocktailName={cocktail.cocktailName}
                                  description={cocktail.description}
                              />
                          ))}
                {modalOpen && (
                    <AddCocktailModal
                        glass={glass}
                        method={method}
                        ingredients={ingredients}
                        setModalOpen={setModalOpen}
                    />
                )}
                <AddCocktailCard
                    imagePath={"/assets/questionMark.png"}
                    name="더 추가하려면 클릭하세요"
                    description="샘플보다 더 많은 칵테일을 저장해 보세요"
                    setModalOpen={setModalOpen}
                />
            </div>
        </>
    );
}

export default CocktailPageBody;
