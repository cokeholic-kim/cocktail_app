"use client"

import { Ingredient } from '@/app/(ingredients)/ingredients/page'
import Image from 'next/image'
import { useState } from 'react';
import { IngredientChecked } from './MyIngredientBody';

function SimpleIngredientCard({ingredient,handleCheck,checked}: {ingredient: Ingredient,handleCheck:(ingredients: IngredientChecked) => void;checked:boolean}) {
  const onClickCard = () => {
    handleCheck(ingredient);
  }

  return (
    <div
      className={`md:w-1/6 w-1/3 p-6 border border-gray-200 rounded-lg shadow ${
        checked
          ? "bg-blue-500 text-white dark:bg-blue-700 dark:text-white"
          : "bg-white dark:bg-gray-800 dark:border-gray-700"
      }`}
      onClick={onClickCard}
    >
      <div className="w-full h-44 mb-4 relative">
        <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
          <Image
            src={ingredient.imagePath}
            alt={ingredient.ingredientName}
            width={400}
            height={300}
            className="rounded-t-lg w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="mb-4">
        <p className={`font-normal  dark:text-gray-400 text-lg ${checked ? "text-white" : "text-gray-700" } `}>
          {ingredient.ingredientName}
        </p>
      </div>
    </div>
  );
}

export default SimpleIngredientCard
