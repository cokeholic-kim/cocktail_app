"use client"

import React, { useState } from 'react'
import { Ingredient } from './page'
import IngredientCard from './IngredientCard'
import NewIngredientCard from './NewIngredientCard'
import NewIngredientForm from '@/app/(cocktails)/cocktails/(swiperpage)/(newIngredient)/NewIngredientForm'
import SearchBox from '@/app/common/components/searchBox';

function IngredientPageBody({ingredients}:{ingredients:Ingredient[]}) {
    const [newIngredientPage, setNewIngredientPage] = useState(false);
    const handleClickNewIngredient = () => {
        setNewIngredientPage(!newIngredientPage);
      };
    const [searchValue,setSearchValue] = useState("")
  return (
    <div className="flex justify-start flex-wrap">
        <SearchBox placeHolder="재료를 검색해주세요" setSearchValue={setSearchValue}/>
        {
            searchValue === "" ? 
            ingredients.map((Ingredient:Ingredient,index:number) => {
                return <IngredientCard key={index} ingredient={Ingredient} size={"md:w-1/4 w-1/2"}/>
            })
            :
            ingredients.filter((ingredient) =>
                ingredient.ingredientName.includes(searchValue)
            ).map((ingredient, index) => {
                return <IngredientCard key={index} ingredient={ingredient} size={"md:w-1/4 w-1/2"}/>
            })
        }
        <NewIngredientCard handleClickNewIngredient={handleClickNewIngredient}/>
        {
            
            newIngredientPage ? (
                <div className="z-50 absolute">
                    <div className=" fixed inset-0 bg-black bg-opacity-70 flex justify-center">
                        <div
                        className="
                        relative max-w-4xl shadow-black bg-slate-200 
                        overflow-hidden rounded-lg transition-all
                        duration-500 animate-[fadeIn_400ms_ease-in-out]"
                        >
                        <span
                            onClick={()=>handleClickNewIngredient()}
                            className="absolute right-5 top-5 cursor-pointer z-40 "
                        >
                            X
                        </span>
                        <div className="p-10 h-screen">
                            <NewIngredientForm setNewIngredientPage={setNewIngredientPage}/>
                        </div>
                        </div>
                    </div>
                 </div>
            
            ) : <></>
        }
    </div>
  )
}

export default IngredientPageBody
