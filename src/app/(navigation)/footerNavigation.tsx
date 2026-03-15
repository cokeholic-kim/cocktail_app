"use client"

import Link from "next/link";
import { RiHome4Line,RiShoppingBasket2Line  } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";
import { TbFilterSearch } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function FooterNavigation() {
  const path = usePathname ();
  const activeTab = useMemo(() => {
    if (!path) return "";
    if (path === "/") return "home";
    if (path.startsWith('/cocktails')) return "cocktail";
    if (path.startsWith('/ingredients')) return "ingredient";
    if (path.startsWith('/myingredients')) return "myIngredient";

    return "";
  }, [path]);

  return (
      <footer className="mt-2 bottom-0 w-full z-10 fixed">
        <div className="max-w-6xl h-20 bg-gray-100 border rounded-tl-2xl rounded-tr-2xl mx-auto px-4 flex justify-between items-center">
        <Link
            href={"/"}
            aria-current={activeTab === "home" ? "page" : undefined}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "home" ? 'bg-gray-300' : ''}`}
            aria-label="홈"
          >
            <RiHome4Line />
            Home
          </Link>
          <Link
            href={"/cocktails"}
            aria-current={activeTab === "cocktail" ? "page" : undefined}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "cocktail" ? 'bg-gray-300' : ''}`}
            aria-label="칵테일 목록"
          >
            <BiDrink/>
            Cocktails
          </Link>
          <Link
            href={"/ingredients"}
            aria-current={activeTab === "ingredient" ? "page" : undefined}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "ingredient" ? 'bg-gray-300' : ''}`}
            aria-label="재료 목록"
          >
            <RiShoppingBasket2Line/>
            Ingredients
          </Link>
          <Link
            href={"/myingredients"}
            aria-current={activeTab === "myIngredient" ? "page" : undefined}
            className={`py-5 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "myIngredient" ? 'bg-gray-300' : ''}`}
            aria-label="내 재료"
          >
            <TbFilterSearch/>
            My Ingredients
          </Link>
        </div>
      </footer>
    );
  }
