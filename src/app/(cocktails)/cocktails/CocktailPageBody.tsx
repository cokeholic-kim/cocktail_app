"use client"

import CocktailCard from '@/app/(home)/cocktailCard'
import React, { useState } from 'react'
import AddCocktailCard from './AddCocktailCard'
import AddCocktailModal from './AddCocktailModal';
import { Ingredient } from '@/app/(ingredients)/ingredients/page'
import { Cocktail } from '../typeinterface'
import SearchBox from '@/app/common/components/searchBox';

function CocktailPageBody({cocktails,glass,method,ingredients}:{cocktails:Cocktail[],glass:string[],method:string[],ingredients:Ingredient[]}) {
   const [modalOpen,setModalOpen] = useState(false);
   const [searchValue,setSearchValue] = useState("")

  return (
    <>
     <SearchBox placeHolder="칵테일을 검색해주세요" setSearchValue={setSearchValue}/>      
     <div className="flex justify-start flex-wrap">
        {searchValue === "" ? 
          cocktails.map((cocktail: Cocktail, index: number) => {
            return (
              <CocktailCard
                key={index}
                imagePath={cocktail.imagePath}
                cocktailName={cocktail.cocktailName}
                description={cocktail.description}
              />
            );
          })
          :  
          cocktails.filter((cocktail) => cocktail.cocktailName.includes(searchValue)).map((cocktail: Cocktail, index: number) => {
            return (
              <CocktailCard
                key={index}
                imagePath={cocktail.imagePath}
                cocktailName={cocktail.cocktailName}
                description={cocktail.description}
              />
            );
          })
        }
          {
              modalOpen && (
                
                  <AddCocktailModal glass={glass} method={method} ingredients={ingredients} setModalOpen={setModalOpen} />
              )
          }
        <AddCocktailCard
          imagePath={"/assets/questionMark.png"}
          name="내 칵테일 만들기"
          description="나만의 칵테일을 만들어 보자"
          setModalOpen={setModalOpen}
        />
      </div>
      {/* <div>유저 창작 칵테일</div>
      <div className="flex justify-start flex-wrap">
        {
          cocktails.map((cocktail: Cocktail, index: number)=> {
            if(cocktail.status === "USER_REGISTERED"){
              return (
                <CocktailCard
                  key={index}
                  imagePath={cocktail.imagePath}
                  cocktailName={cocktail.cocktailName}
                  description={cocktail.description}
                />
              );
            }
          })
        }
       
      </div> */}
    </>
  );
}

export default CocktailPageBody
