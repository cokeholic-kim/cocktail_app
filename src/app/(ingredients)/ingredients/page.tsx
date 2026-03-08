import { BASE_URL } from "@/app/(common)/common";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";
import IngredientPageBody from "./IngredientPageBody";

type ApiEnvelope<T> = {
  body: T;
}

export interface Ingredient {
  ingredientName: string;
  enName: string;
  category: string;
  imagePath: string;
  usedCocktail: [UsedCocktail] | null;
}

interface UsedCocktail {
  cocktailName: string;
  imagePath: string;
}

async function getIngredients() {
  return fetchWithCookie<ApiEnvelope<Ingredient[]>>(`${BASE_URL}/ingredient/getAll`, AUTH_COOKIE_NAME, {
    fallback: { body: [] },
  })
}

async function IngredientsPage() {
  const ingredientsData = await getIngredients();
  if (!ingredientsData.ok) {
    return (
      <div className="m-6 text-sm rounded border border-amber-300 bg-amber-50 p-4 text-amber-900">
        현재 백엔드가 일시적으로 응답하지 않습니다. 재료 목록을 불러올 수 없습니다.
      </div>
    )
  }

  const ingredients = ingredientsData.data.body;
  return (
    <IngredientPageBody ingredients={ingredients} />

  )
}

export default IngredientsPage
