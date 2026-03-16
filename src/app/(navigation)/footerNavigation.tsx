"use client";

import Link from "next/link";
import { RiHome4Line, RiShoppingBasket2Line } from "react-icons/ri";
import { BiDrink } from "react-icons/bi";
import { TbFilterSearch } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function FooterNavigation() {
    const path = usePathname();
    const activeTab = useMemo(() => {
        if (!path) {
            return "";
        }
        if (path === "/") return "home";
        if (path.startsWith("/cocktails")) return "cocktail";
        if (path.startsWith("/ingredients")) return "ingredient";
        if (path.startsWith("/myingredients")) return "myIngredient";

        return "";
    }, [path]);

    return (
        <nav aria-label="하단 내비게이션" className="fixed inset-x-0 bottom-0 w-full z-10">
            <div className="max-w-6xl mx-auto min-h-20 bg-gray-100 border rounded-tl-2xl rounded-tr-2xl px-4 flex justify-between items-center pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
                <Link
                    href={"/"}
                    aria-current={activeTab === "home" ? "page" : undefined}
                    className={`min-h-[44px] min-w-[44px] py-4 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "home" ? "bg-gray-300" : ""}`}
                    aria-label="홈"
                >
                    <RiHome4Line />
                    <span>Home</span>
                </Link>
                <Link
                    href={"/cocktails"}
                    aria-current={activeTab === "cocktail" ? "page" : undefined}
                    className={`min-h-[44px] min-w-[44px] py-4 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "cocktail" ? "bg-gray-300" : ""}`}
                    aria-label="칵테일 목록"
                >
                    <BiDrink />
                    <span>Cocktails</span>
                </Link>
                <Link
                    href={"/ingredients"}
                    aria-current={activeTab === "ingredient" ? "page" : undefined}
                    className={`min-h-[44px] min-w-[44px] py-4 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "ingredient" ? "bg-gray-300" : ""}`}
                    aria-label="재료 목록"
                >
                    <RiShoppingBasket2Line />
                    <span>Ingredients</span>
                </Link>
                <Link
                    href={"/myingredients"}
                    aria-current={activeTab === "myIngredient" ? "page" : undefined}
                    className={`min-h-[44px] min-w-[44px] py-4 px-3 text-gray-700 hover:text-gray-900 w-1/4 text-center flex flex-col items-center ${activeTab === "myIngredient" ? "bg-gray-300" : ""}`}
                    aria-label="내 재료"
                >
                    <TbFilterSearch />
                    <span>My Ingredients</span>
                </Link>
            </div>
        </nav>
    );
}
