"use client";

import { useEffect, useRef, useState } from "react";
import { Ingredient } from "./../../(ingredients)/ingredients/page";
import SimpleIngredientCard from "./SimpleIngredientCard";
import IngredientCard from "@/app/(ingredients)/ingredients/IngredientCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import SwiperCore from "swiper";

interface ResponseData {
    cocktailName: string;
    includeIngredients: [];
    excludedIngredients: [];
}

export interface IngredientChecked extends Ingredient {
    checked?: boolean;
}

function MyIngredientBody({ ingredients }: { ingredients: Ingredient[] }) {
    const swiperRef = useRef<SwiperCore | null>(null);
    const [ingredientData, setIngredientData] = useState<IngredientChecked[]>(ingredients);
    const [searchValue, setSearchValue] = useState("");
    const [checkedIngredients, setCheckedIngredients] = useState<IngredientChecked[]>([]);

    useEffect(() => {
        if (!swiperRef.current || checkedIngredients.length === 0) {
            return;
        }

        swiperRef.current.slideTo(checkedIngredients.length - 1);
    }, [checkedIngredients]);

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
            }

            return [...prevCheckedIngredients, ingredient];
        });
    };

    const getIngredientNames = (checkedIngredients: Ingredient[]): string[] => {
        return checkedIngredients.map((ingredient) => ingredient.ingredientName);
    };

    return (
        <>
            {checkedIngredients.length > 0 && (
                <Link
                    href={{
                        pathname: "/myingredients/fitCocktail",
                        query: {
                            checkedIngredients: JSON.stringify(getIngredientNames(checkedIngredients)),
                        },
                    }}
                    className="m-3 inline-flex items-center px-3 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-h-[44px]"
                >
                    칵테일 추천 보기
                </Link>
            )}

            <div className="min-h-28">
                {checkedIngredients.length > 0 ? (
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation, Scrollbar]}
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        scrollbar={{
                            el: ".swiper-scrollbar",
                            draggable: true,
                        }}
                    >
                        {checkedIngredients.map((ingredient, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <IngredientCard ingredient={ingredient} size={" "} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                ) : (
                    <div className="min-h-28 flex justify-center items-center">
                        <p className="text-lg font-bold">재료를 선택해 추천 칵테일을 확인하세요</p>
                    </div>
                )}
            </div>

            <nav className={`sticky top-0 z-10 bg-black flex justify-between items-center px-4 py-3 w-full`}>
                <input
                    aria-label="재료 검색"
                    className="bg-gray-800 rounded-md text-white px-3 py-3 w-full focus:outline-none"
                    type="text"
                    placeholder="재료 검색"
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </nav>

            <div className="flex justify-start flex-wrap gap-4">
                {searchValue === "" ? (
                    ingredientData.map((ingredient, index) => (
                        <SimpleIngredientCard
                            key={index}
                            ingredient={ingredient}
                            handleCheck={handleCheck}
                            checked={ingredient.checked!}
                        />
                    ))
                ) : (
                    ingredientData
                        .filter((ingredient) => ingredient.ingredientName.includes(searchValue))
                        .map((ingredient, index) => (
                            <SimpleIngredientCard
                                key={index}
                                ingredient={ingredient}
                                handleCheck={handleCheck}
                                checked={ingredient.checked!}
                            />
                        ))
                )}
            </div>
        </>
    );
}

export default MyIngredientBody;
