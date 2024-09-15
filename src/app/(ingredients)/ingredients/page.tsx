import { BASE_URL } from "@/app/(common)/common";
import { fetchWithCookie } from "@/app/(cocktails)/cocktails/page";
import IngredientPageBody from "./IngredientPageBody";

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
    <IngredientPageBody ingredients={ingredients}/>
    
  )
}

export default IngredientsPage
