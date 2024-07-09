import { BASE_URL } from "@/app/(home)/page";
import MyIngredientBody from "./MyIngredientBody"

interface UsedCocktail {
  cocktailName : string;
  imagePath : string;
}

async function getIngredient() {
  return fetch(BASE_URL + "/ingredient/getAll").then((response) =>
    response.json()
  );
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
