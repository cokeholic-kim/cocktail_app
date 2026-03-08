import { BASE_URL } from "@/app/(common)/common";
import CocktailPageBody from "./CocktailPageBody";
import { cookies } from "next/headers";
import { fetchWithCookie, AUTH_COOKIE_NAME } from "@/app/(common)/fetchUtils";

async function getAllCocktail() {
  return fetchWithCookie(BASE_URL + "/cocktail/getAll", AUTH_COOKIE_NAME);
}

async function getGlass() {
  return fetchWithCookie(BASE_URL + "/cocktail/glass", AUTH_COOKIE_NAME);
}

async function getMethod() {
  return fetchWithCookie(BASE_URL + "/cocktail/method", AUTH_COOKIE_NAME);
}

async function getAllIngredients() {
  return fetchWithCookie(BASE_URL + "/ingredient/getAll", AUTH_COOKIE_NAME);
}

async function CocktailsPage() {
  const authToken = (await cookies()).get(AUTH_COOKIE_NAME)
  const [cocktailData, glassData, methodData, ingredientData] = await Promise.all([
    getAllCocktail(),
    getGlass(),
    getMethod(),
    getAllIngredients()
  ]);
  const cocktails = cocktailData.body;
  const glass = glassData.body;
  const method = methodData.body;
  const ingredients = ingredientData.body;

  return (
    <>
      <CocktailPageBody cocktails={cocktails} glass={glass} method={method} ingredients={ingredients} />
    </>
  );
}

export default CocktailsPage;
