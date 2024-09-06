import { BASE_URL } from "@/app/(common)/common";
import MyIngredientBody from "./MyIngredientBody"
import { fetchWithCookie } from "@/app/(cocktails)/cocktails/page";

interface UsedCocktail {
  cocktailName : string;
  imagePath : string;
}

async function getIngredient() {
  return fetchWithCookie(`${BASE_URL}/ingredient/getAll`,"Authorization")
}

async function MyIngredient() {
  const ingredientData = await getIngredient();
  const ingredients = ingredientData.body;
  return (
    <div>
      <MyIngredientBody ingredients = {ingredients}/>
    </div>
  )
}



export default MyIngredient
