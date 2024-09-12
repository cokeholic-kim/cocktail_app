"use client"

import Image from "next/image";
import Link from "next/link";
import { RiHome4Line,RiShoppingBasket2Line  } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";
import { TbFilterSearch } from "react-icons/tb";
import { useRouter } from "next/router";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function FooterNavigation() {
  const path = usePathname ();
  const [footerState,setFooterState] = useState({
    home:true,
    cocktail:false,
    ingredient:false,
    myIngredient:false,
  })

  useEffect(()=>{
    if(path){
      if (path === '/') {
        setFooterState({ home: true, cocktail: false, ingredient: false, myIngredient: false });
      } else if (path.startsWith('/cocktails')) {
        setFooterState({ home: false, cocktail: true, ingredient: false, myIngredient: false });
      } else if (path.startsWith('/ingredients')) {
        setFooterState({ home: false, cocktail: false, ingredient: true, myIngredient: false });
      } else if (path.startsWith('/myingredients')) {
        setFooterState({ home: false, cocktail: false, ingredient: false, myIngredient: true });
      } else {
        setFooterState({ home: false, cocktail: false, ingredient: false, myIngredient: false });
      }
    }
  },[path])

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

