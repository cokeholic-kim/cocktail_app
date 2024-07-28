import { BASE_URL } from "@/app/(common)/common";
import { Ingredient } from "../page";
import Image from "next/image";
import Link from "next/link";

async function getDetailIngredients(name : string){
    return fetch(BASE_URL + "/ingredient/getDetail/" + name).then((response) =>
        response.json()
      );
}

async function IngredientDetai({params:{name}}:{params: {name:string}}) {
    const ingredientData = await getDetailIngredients(name);
    const ingreident:Ingredient = ingredientData.body;
  return (
    <div className="text-black">
        {/* {JSON.stringify(ingredientData)} */}
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
            <h1 className="text-4xl mb-3">사용되는 칵테일</h1>
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
