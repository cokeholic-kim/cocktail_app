import { BASE_URL } from "@/app/(common)/common";
import IngredientCard from "./IngredientCard";
import { fetchWithCookie } from "@/app/(cocktails)/cocktails/page";

export interface Ingredient {
    ingredientName: string;
    enName: string;
    category: string;
    imagePath: string;
    usedCocktail: [UsedCocktail] | null;
}

interface UsedCocktail {
    cocktailName : string;
    imagePath : string;
}

async function getCocktail() {
    return fetchWithCookie(`${BASE_URL}/ingredient/getAll`,"Authorization")
  }

async function IngredientsPage() {
    const ingredientsData = await getCocktail();
    const ingredients = ingredientsData.body;
  return (
    
    <div className="flex justify-start flex-wrap">
        {
            ingredients.map((Ingredient:Ingredient,index:number) => {
                return <IngredientCard key={index} ingredient={Ingredient}/>
            })
        }
    </div>
  )
}

export default IngredientsPage
