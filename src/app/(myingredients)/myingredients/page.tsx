import { BASE_URL } from "@/app/(common)/common";
import MyIngredientBody from "./MyIngredientBody";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import type { Ingredient } from "@/app/(ingredients)/ingredients/page";
import { OfflineDataNotice } from "@/app/(common)/offlineMode";
import { DataViewState, normalizeErrorMessage, resolveDataState } from "@/app/(common)/components/dataStateNotice";

type ApiEnvelope<T> = {
    body: T;
}

const fallbackIngredients: Ingredient[] = [
    {
        ingredientName: "Sample Ingredient",
        enName: "Sample Ingredient",
        category: "Spirit",
        imagePath: "/assets/icon-384x384.png",
        usedCocktail: null,
    },
];

async function getIngredient() {
    return fetchWithCookie<ApiEnvelope<Ingredient[]>>(`${BASE_URL}/ingredient/getAll`, "Authorization", {
        fallback: { body: [] },
    });
}

async function MyIngredient() {
    const ingredientData = await getIngredient();
    const ingredients = ingredientData.ok ? ingredientData.data?.body ?? [] : [];
    const errorMessage = normalizeErrorMessage([ingredientData.error]);
    const ingredientListState: DataViewState = resolveDataState(ingredientData.ok, ingredients.length > 0);

    return (
        <div>
            {ingredientListState === "error" && <OfflineDataNotice pageLabel="My Ingredients" errorMessage={errorMessage} />}
            <MyIngredientBody ingredients={ingredients.length > 0 ? ingredients : fallbackIngredients} />
        </div>
    );
}

export default MyIngredient;
