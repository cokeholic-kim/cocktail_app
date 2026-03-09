import { BASE_URL } from "@/app/(common)/common";
import CocktailPageBody from "./CocktailPageBody";
import { cookies } from "next/headers";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";
import type { Cocktail } from "@/app/(cocktails)/typeinterface";
import type { Ingredient } from "@/app/(ingredients)/ingredients/page";
import { OfflineDataNotice } from "@/app/(common)/offlineMode";

type ApiEnvelope<T> = {
  body: T;
}

const fallbackCocktails: Cocktail[] = [
  {
    cocktailName: "샘플 올드 패션드",
    proof: 35,
    glass: "Old Fashioned Glass",
    method: "Shake",
    garnish: "오렌지 필",
    description: "백엔드 연결 없이 표시되는 샘플 데이터",
    imagePath: "/assets/icon-384x384.png",
    ingredients: [
      {
        ingredientName: "버번 위스키",
        volume: 45,
        unit: "ml",
        imagePath: "/assets/icon-384x384.png",
      },
    ],
    status: "SAMPLE",
  },
];

const fallbackGlass: string[] = ["컵 타입 샘플 1", "컵 타입 샘플 2"];
const fallbackMethod: string[] = ["Shaken", "Built"];
const fallbackIngredients: Ingredient[] = [
  {
    ingredientName: "버번 위스키",
    enName: "Bourbon",
    category: "베이스",
    imagePath: "/assets/icon-384x384.png",
    usedCocktail: null,
  },
];

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
  const isOffline = !cocktailData.ok || !glassData.ok || !methodData.ok || !ingredientData.ok;
  const cocktails = cocktailData.ok ? cocktailData.data.body : fallbackCocktails;
  const glass = glassData.ok ? glassData.data.body : fallbackGlass;
  const method = methodData.ok ? methodData.data.body : fallbackMethod;
  const ingredients = ingredientData.ok ? ingredientData.data.body : fallbackIngredients;

  return (
    <>
      {isOffline && <OfflineDataNotice pageLabel="칵테일 목록" />}
      <CocktailPageBody cocktails={cocktails} glass={glass} method={method} ingredients={ingredients} />
    </>
  );
}

export default CocktailsPage;
