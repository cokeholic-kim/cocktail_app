import { BASE_URL } from "@/app/(common)/common";
import { Ingredient } from "../page";
import Image from "next/image";
import Link from "next/link";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import { OfflineDataNotice } from "@/app/(common)/offlineMode";

type ApiEnvelope<T> = {
  body: T;
}

async function getDetailIngredients(name: string) {
    return fetchWithCookie<ApiEnvelope<Ingredient | null>>(`${BASE_URL}/ingredient/getDetail/${name}`, "Authorization", {
      fallback: { body: null },
    })
}

const fallbackIngredient: Ingredient = {
  ingredientName: "샘플 재료",
  enName: "Sample Ingredient",
  category: "샘플 카테고리",
  imagePath: "/assets/icon-384x384.png",
  usedCocktail: [
    {
      cocktailName: "샘플 칵테일",
      imagePath: "/assets/icon-384x384.png",
    },
  ],
};

async function IngredientDetai({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const ingredientData = await getDetailIngredients(name);
    const isOffline = !ingredientData.ok || !ingredientData.data.body;
    const ingreident = ingredientData.ok && ingredientData.data.body ? ingredientData.data.body : fallbackIngredient;

    return (
        <div className="text-black">
            {isOffline && <OfflineDataNotice pageLabel={`재료 상세 (${name})`} />}
            <div className="w-full h-96 relative -mb-8 -z-10">
                <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
                    <Image
                        src={ingreident.imagePath}
                        alt={ingreident.ingredientName}
                        width={400}
                        height={300}
                        className="rounded-t-lg w-full h-full object-contain"
                    />
                </div>
            </div>
            <div className="rounded-t-3xl border-black bg-slate-50 overflow-hidden p-5 mb-5">
                <h1 className="text-4xl mb-3">{ingreident.ingredientName}</h1>
                <p className="text-blue-600/50">{ingreident.category}</p>
                <div className="md:min-h-40 min-h-28">
                    <p>{ingreident.enName}</p>
                </div>
            </div>
            <div className="border-black bg-slate-50 overflow-hidden p-5">
                <h1 className="text-4xl mb-3">관련 칵테일</h1>
                <ul>
                    {ingreident.usedCocktail?.map((cocktail) => (
                        <li className="flex mb-3 h-20 items-center" key={cocktail.cocktailName}>
                            <div className="inset-0 w-20 h-full border-4 border-indigo-400 rounded-full overflow-hidden">
                                <Image
                                    src={cocktail.imagePath}
                                    alt={cocktail.cocktailName}
                                    width={50}
                                    height={50}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <Link href={`/cocktails/${cocktail.cocktailName}`}>
                                <p className="ml-5 text-base">{cocktail.cocktailName}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default IngredientDetai
