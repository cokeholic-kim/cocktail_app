import { BASE_URL } from "@/app/(common)/common";
import CocktailPageBody from "./CocktailPageBody";
import { cookies } from "next/headers";
import { fetchWithCookie, AUTH_COOKIE_NAME } from "@/app/(common)/fetchUtils";
import type { Cocktail } from "@/app/(cocktails)/typeinterface";
import type { Ingredient } from "@/app/(ingredients)/ingredients/page";

type ApiEnvelope<T> = {
  body: T;
}

async function getAllCocktail() {
  return fetchWithCookie<ApiEnvelope<Cocktail[]>>(BASE_URL + "/cocktail/getAll", AUTH_COOKIE_NAME, {
    fallback: { body: [] },
  });
}

async function getGlass() {
  return fetchWithCookie<ApiEnvelope<string[]>>(BASE_URL + "/cocktail/glass", AUTH_COOKIE_NAME, {
    fallback: { body: [] },
  });
}

async function getMethod() {
  return fetchWithCookie<ApiEnvelope<string[]>>(BASE_URL + "/cocktail/method", AUTH_COOKIE_NAME, {
    fallback: { body: [] },
  });
}

async function getAllIngredients() {
  return fetchWithCookie<ApiEnvelope<Ingredient[]>>(BASE_URL + "/ingredient/getAll", AUTH_COOKIE_NAME, {
    fallback: { body: [] },
  });
}

async function CocktailsPage() {
  const authToken = (await cookies()).get(AUTH_COOKIE_NAME)
  const [cocktailData, glassData, methodData, ingredientData] = await Promise.all([
    getAllCocktail(),
    getGlass(),
    getMethod(),
    getAllIngredients()
  ]);
  const hasError = !cocktailData.ok || !glassData.ok || !methodData.ok || !ingredientData.ok;
  const cocktails = cocktailData.data.body;
  const glass = glassData.data.body;
  const method = methodData.data.body;
  const ingredients = ingredientData.data.body;

  return (
    <>
      {hasError && <div className="m-6 text-sm rounded border border-amber-300 bg-amber-50 p-4 text-amber-900">현재 백엔드가 일시적으로 응답하지 않습니다. 일부 데이터는 기본값으로 노출됩니다.</div>}
      <CocktailPageBody cocktails={cocktails} glass={glass} method={method} ingredients={ingredients} />
    </>
  );
}

export default CocktailsPage;
