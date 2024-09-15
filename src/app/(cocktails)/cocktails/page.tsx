import { BASE_URL } from "@/app/(common)/common";
import CocktailPageBody from "./CocktailPageBody";
import { cookies } from "next/headers";

export async function fetchWithCookie(url:string, cookieName:string) {
  const authToken = cookies().get(cookieName);
  const headers = {
      'Cookie': authToken?.value ? `${cookieName}=${authToken.value}` : "",
      'Content-Type': 'application/json'
  };
  return fetch(url, {
      headers,
      credentials: 'include'
  }).then(response => response.json());
}

async function getAllCocktail() {
  return fetchWithCookie(BASE_URL + "/cocktail/getAll", "Authorization");
}

async function getGlass() {
  return fetchWithCookie(BASE_URL + "/cocktail/glass", "Authorization");
}

async function getMethod() {
  return fetchWithCookie(BASE_URL + "/cocktail/method", "Authorization");
}

async function getAllIngredients() {
  return fetchWithCookie(BASE_URL + "/ingredient/getAll", "Authorization");
}

async function CocktailsPage() {
  const authToken = cookies().get("Authorization")
  console.log(authToken?.name + "쿠키이름" ,authToken?.value);
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
      <CocktailPageBody cocktails={cocktails} glass={glass} method={method} ingredients={ingredients}/>
    </>
  );
}

export default CocktailsPage;
