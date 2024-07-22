"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import IngredientModal from "./ingredientModal";
import { CocktailFit } from "@/app/(common)/commonProps";

function FitCocktailCard({data}:{data:CocktailFit}) {
    const [modalOpen,setModalOpen] = useState(false);
  return (
    <div className="md:w-1/4 w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-44 mb-4 relative">
        <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
          <Image
            src={data.imagePath}
            alt={data.cocktailName}
            width={400}
            height={300}
            className="rounded-t-lg w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="mb-4">
        <p
          className={`font-normal text-lg ${
            data.excludeIngredient.length === 0
              ? "text-yellow-300 dark:text-yellow-400"
              : "text-gray-700 dark:text-gray-400"
          }`}
        >
          {" "}
          {data.cocktailName}{" "}
        </p>
      </div>
      <div className="mb-6 relative">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <button onClick={() => setModalOpen(!modalOpen)}>
            재료 조회
          </button>
          <span className="text-yellow-300 mr-3 ml-3">{data.includeIngredients.length}</span>
          <span className="text-red-600">{data.excludeIngredient.length}</span>
        </p>
        {modalOpen && (
          <IngredientModal includeIngredients={data.includeIngredients} excludeIngredients={data.excludeIngredient}/>
        )}
      </div>
      <div>
        <Link
          href={`/cocktails/${data.cocktailName}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default FitCocktailCard
