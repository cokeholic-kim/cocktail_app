import { BASE_URL } from "@/app/(common)/common";
import MyIngredientBody from "./MyIngredientBody"
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import type { Ingredient } from "@/app/(ingredients)/ingredients/page";

type ApiEnvelope<T> = {
  body: T;
}

interface UsedCocktail {
  cocktailName: string;
  imagePath: string;
}

async function getIngredient() {
  return fetchWithCookie<ApiEnvelope<Ingredient[]>>(`${BASE_URL}/ingredient/getAll`, "Authorization", {
    fallback: { body: [] },
  })
}

async function MyIngredient() {
  const ingredientData = await getIngredient();
  if (!ingredientData.ok) {
    return (
      <div className="m-6 text-sm rounded border border-amber-300 bg-amber-50 p-4 text-amber-900">
        현재 백엔드가 일시적으로 응답하지 않습니다. 내 재료 목록을 불러올 수 없습니다.
      </div>
    )
  }

  const ingredients = ingredientData.data.body;
  return (
    <div>
      <MyIngredientBody ingredients={ingredients} />
    </div>
  )
}



export default MyIngredient
