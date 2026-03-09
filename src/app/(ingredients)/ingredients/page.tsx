import { BASE_URL } from "@/app/(common)/common";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";
import IngredientPageBody from "./IngredientPageBody";
import { OfflineDataNotice } from "@/app/(common)/offlineMode";

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

const fallbackIngredients: Ingredient[] = [
    {
        ingredientName: "Sample Ingredient",
        enName: "Rum",
        category: "Spirit",
        imagePath: "/assets/icon-384x384.png",
        usedCocktail: null,
    },
];

async function getIngredients() {
    return fetchWithCookie<ApiEnvelope<Ingredient[]>>(`${BASE_URL}/ingredient/getAll`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

async function IngredientsPage() {
    const ingredientsData = await getIngredients();
    const isOffline = !ingredientsData.ok;
    const ingredients = ingredientsData.ok ? ingredientsData.data?.body ?? [] : [];
    const errorMessage = !ingredientsData.ok ? ingredientsData.error : undefined;

    return (
        <div>
            {isOffline && <OfflineDataNotice pageLabel="Ingredient List" errorMessage={errorMessage} />}
            <IngredientPageBody ingredients={ingredients.length > 0 ? ingredients : fallbackIngredients} />
        </div>
    );
}

export default IngredientsPage;
