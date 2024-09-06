import { BASE_URL } from "@/app/(common)/common";
import Image from "next/image";
import { fetchWithCookie } from "../page";

interface Cocktail {
    cocktailName: string;
    proof: number;
    glass: string;
    method: string;
    garnish: string;
    description: string | null;
    imagePath: string;
    ingredients: Ingredient[];
  }
  
  interface Ingredient {
    ingredientName: string;
    volume: number;
    unit: string;
    imagePath: string;
  }

async function getDetailCocktail(name : string){
    return fetchWithCookie(`${BASE_URL}/cocktail/getDetail/${name}`, "Authorization");
}




async function CocktailDetail({params:{name}}:{params: {name:string}}) {
  const cocktailData = await getDetailCocktail(name);
  const cocktail:Cocktail = cocktailData.body;
  return (
    <div className="text-black">
        <div className="w-full h-96 relative -mb-8 -z-10">
            <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
                <Image
                src={cocktail.imagePath}
                alt={cocktail.cocktailName}
                width={400}
                height={300}
                className="rounded-t-lg w-full h-full object-contain"
                />
            </div>
        </div>
        <div className="rounded-t-3xl border-black bg-slate-50 overflow-hidden p-5 mb-5">
            <h1 className="text-4xl mb-3">{cocktail.cocktailName}</h1>
            <p className="text-blue-600/50">도수 : {cocktail.proof} 도</p>
            <div className="md:min-h-40 min-h-28">
                <p>{cocktail.description}</p>
            </div>
            <p className="mb-3">잔 종류 : {cocktail.glass}</p>
            <p className="mb-3">기법 : {cocktail.method}</p>
            <p className="mb-3">가니시 : {cocktail.garnish}</p>
        </div>
        <div className="border-black bg-slate-50 overflow-hidden p-5">
            <h1 className="text-4xl mb-3">재료</h1>
            <ul>
                {cocktail.ingredients.map((ingredient) => (
                    <li className="flex mb-3 h-20 items-center justify-between" key={ingredient.ingredientName}>
                        <div className="inset-0 w-20 h-full border-4 border-indigo-400 rounded-full overflow-hidden">
                            <Image
                            src={ingredient.imagePath}
                            alt={ingredient.ingredientName}
                            width={50}
                            height={50}
                            className="w-full h-full object-contain"
                            />
                        </div>
                        <p>{ingredient.ingredientName}</p>
                        <p>{ingredient.volume} {ingredient.unit}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    
  )
}

export default CocktailDetail
