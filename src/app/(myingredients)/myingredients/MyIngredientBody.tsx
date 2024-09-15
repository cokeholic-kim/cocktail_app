"use client"

import { useEffect, useRef, useState } from "react";
import { Ingredient } from './../../(ingredients)/ingredients/page';
import SimpleIngredientCard from "./SimpleIngredientCard";
import IngredientCard from "@/app/(ingredients)/ingredients/IngredientCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules';
import SwiperCore from "swiper"

interface ResponseData {
  cocktailName : string,
  includeIngredients  :[],
  excludedIngredients  :[]
}

export interface IngredientChecked extends Ingredient {
  checked?: boolean,
}

function MyIngredientBody({ ingredients }: { ingredients: Ingredient[] }) {
    const swiperRef = useRef<SwiperCore>();
    const [ingredientData,setIngredientData] = useState<IngredientChecked[]>([])
    const [searchValue,setSearchValue] = useState("")
    const [checkedIngredients, setCheckedIngredients] = useState<IngredientChecked[]>([]);

    useEffect(()=> {
      setIngredientData(ingredients)
    },[])

    useEffect(()=> {
      if (swiperRef.current) {
        swiperRef.current.slideTo(checkedIngredients.length - 1);
      }
    },[checkedIngredients])

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
          className="m-3 float-right inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          칵테일 찾기
        </Link>
      )}

      <div className="min-h-28">
        {
          checkedIngredients.length > 0 ? 
          <Swiper
          onSwiper={(swiper) => {
              swiperRef.current = swiper;
          }}
          modules={[Navigation, Scrollbar]}
          spaceBetween={20}
          // slidesPerView={4}
          breakpoints={{
            // 모바일 화면 (640px 이하)에서는 slidesPerView를 2로 설정
            0: {
                slidesPerView: 2,
            },
            // 그 외의 화면에서는 slidesPerView를 4로 설정
            1024: {
                slidesPerView: 4,
            },
          }}
          scrollbar={{
              el: ".swiper-scrollbar",
              draggable: true,
          }}
          >
         
            {checkedIngredients.map((ingredient, index)=> {
              return (
                <SwiperSlide key={index}>
                  <IngredientCard ingredient={ingredient} size={" "}/>
                </SwiperSlide>
              )
            })}
          </Swiper> :
          <div className="min-h-28 flex justify-center items-center">
            <p className="text-lg font-bold">재료를 선택하고 만들수있는 칵테일을 검색!</p>
          </div>
        }

       
      </div>
      <nav
        className={`flex justify-between items-center px-6 py-5   w-full z-10 transition-all duration-500 "bg-black"`}
      >
        <input
          className="bg-gray-800 rounded-md text-white px-3 py-2 w-full focus:outline-none"
          type="text"
          placeholder="재료를 검색해 주세요"
          onChange={(e)=>setSearchValue(e.target.value)}
        />
      </nav>
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
