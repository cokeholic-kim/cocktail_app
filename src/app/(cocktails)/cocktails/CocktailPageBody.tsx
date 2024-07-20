"use client"

import CocktailCard from '@/app/(home)/cocktailCard'
import { CocktailCardProps } from '@/app/(home)/page'
import React, { useCallback, useMemo, useState } from 'react'
import AddCocktailCard from './AddCocktailCard'
import AddCocktailModal from './AddCocktailModal';
import { Ingredient } from '@/app/(ingredients)/ingredients/page'
import { useLoginContext } from '@/app/(context)/LoginContext'
import { Cocktail } from '../typeinterface'

function CocktailPageBody({cocktails,glass,method,ingredients}:{cocktails:Cocktail[],glass:string[],method:string[],ingredients:Ingredient[]}) {
   const [modalOpen,setModalOpen] = useState(false);

  return (
    <>
      <div>술래 공식 칵테일</div>
      <div className="flex justify-start flex-wrap">
        {cocktails.map((cocktail: Cocktail, index: number) => {
          if(cocktail.status === "ADMIN_REGISTERED")
          return (
            <CocktailCard
              key={index}
              imagePath={cocktail.imagePath}
              name={cocktail.cocktailName}
              description={cocktail.description}
            />
          );
        })}
       
        

          {
              modalOpen && (
                
                  <AddCocktailModal glass={glass} method={method} ingredients={ingredients} setModalOpen={setModalOpen} />
              )
          }
      </div>
      <div>유저 창작 칵테일</div>
      <div className="flex justify-start flex-wrap">
        {
          cocktails.map((cocktail: Cocktail, index: number)=> {
            if(cocktail.status === "USER_REGISTERED"){
              return (
                <CocktailCard
                  key={index}
                  imagePath={cocktail.imagePath}
                  name={cocktail.cocktailName}
                  description={cocktail.description}
                />
              );
            }
          })
        }
        <AddCocktailCard
          imagePath={"/assets/questionMark.png"}
          name="내 칵테일 만들기"
          description="나만의 칵테일을 만들어 보자"
          setModalOpen={setModalOpen}
        />
      </div>
    </>
  );
}

export default CocktailPageBody
