import { BASE_URL } from "@/app/(home)/page";
import IngredientCard from "./IngredientCard";

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
    return fetch(BASE_URL + "/ingredient/getAll").then((response) =>
      response.json()
    );
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
