import { BASE_URL } from "@/app/(home)/page";
import CocktailPageBody from "./CocktailPageBody";

async function getAllCocktail(){
    return fetch(BASE_URL + "/cocktail/getAll",{ cache: 'no-store' }).then((response) =>
        response.json()
      );
}

async function getGlass(){
  return fetch(BASE_URL + "/cocktail/glass").then((response) =>
    response.json()
  );
}

async function getMethod(){
  return fetch(BASE_URL + "/cocktail/method").then((response) =>
    response.json()
  );
}

async function getAllIngredients() {
  return fetch(BASE_URL + "/ingredient/getAll",{ cache: 'no-store' }).then((response) =>
    response.json()
  );
}


async function CocktailsPage() {
  const [cocktailData,glassData,methodData,ingredientData] = await Promise.all([getAllCocktail(),getGlass(),getMethod(),getAllIngredients()]) ;
  const cocktails = cocktailData.body;
  const glass = glassData.body;
  const method = methodData.body;
  const ingredients = ingredientData.body;

  return (
    <>
        <CocktailPageBody cocktails={cocktails} glass={glass} method={method} ingredients={ingredients}/>
        {/* {JSON.stringify(cocktails)} */}
    </>
  )
}

export default CocktailsPage;
