"use client"

import Link from "next/link";
import { RiHome4Line,RiShoppingBasket2Line  } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";
import { TbFilterSearch } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function FooterNavigation() {
  const path = usePathname ();
  const footerState = useMemo(() => {
    if (!path) return { home: false, cocktail: false, ingredient: false, myIngredient: false };
    if (path === "/") return { home: true, cocktail: false, ingredient: false, myIngredient: false };
    if (path.startsWith('/cocktails')) return { home: false, cocktail: true, ingredient: false, myIngredient: false };
    if (path.startsWith('/ingredients')) return { home: false, cocktail: false, ingredient: true, myIngredient: false };
    if (path.startsWith('/myingredients')) return { home: false, cocktail: false, ingredient: false, myIngredient: true };

    return { home: false, cocktail: false, ingredient: false, myIngredient: false };
  }, [path]);

    return (
      <footer className="mt-2 bottom-0 w-full z-10 fixed">
        <div className="max-w-6xl h-20 bg-gray-100 border rounded-tl-2xl rounded-tr-2xl mx-auto px-4 flex justify-between items-center">
        <Link
            href={"/"}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${footerState.home ? 'bg-gray-300' : ''}`}
          >
            <RiHome4Line />
            홈
          </Link>
          <Link
            href={"/cocktails"}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${footerState.cocktail ? 'bg-gray-300' : ''}`}
          >
            <BiDrink/>
            칵테일
          </Link>
          <Link
            href={"/ingredients"}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${footerState.ingredient ? 'bg-gray-300' : ''}`}
          >
            <RiShoppingBasket2Line/>
            재료 목록
          </Link>
          <Link
            href={"/myingredients"}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${footerState.myIngredient ? 'bg-gray-300' : ''}`}
          >
            <TbFilterSearch/>
            나의 재료
          </Link>
        </div>
      </footer>
    );
  }

