import { BASE_URL } from "@/app/(common)/common";
import MyIngredientBody from "./MyIngredientBody"
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import type { Ingredient } from "@/app/(ingredients)/ingredients/page";
import { OfflineDataNotice } from "@/app/(common)/offlineMode";

type ApiEnvelope<T> = {
  body: T;
}

const fallbackIngredients: Ingredient[] = [
  {
    ingredientName: "샘플 재료",
    enName: "Sample Ingredient",
    category: "샘플",
    imagePath: "/assets/icon-384x384.png",
    usedCocktail: null,
  },
];

async function getIngredient() {
  return fetchWithCookie<ApiEnvelope<Ingredient[]>>(`${BASE_URL}/ingredient/getAll`, "Authorization", {
    fallback: { body: [] },
  })
}

async function MyIngredient() {
  const ingredientData = await getIngredient();
  const ingredients = ingredientData.ok ? ingredientData.data.body : fallbackIngredients;

  return (
    <div>
      {!ingredientData.ok && <OfflineDataNotice pageLabel="내가 가진 재료" />}
      <MyIngredientBody ingredients={ingredients} />
    </div>
  )
}

export default MyIngredient
