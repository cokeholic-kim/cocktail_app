import { BASE_URL } from "@/app/(common)/common";
import CocktailPageBody from "./CocktailPageBody";
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
        cocktailName: "Sample Cocktail",
        proof: 35,
        glass: "Old Fashioned Glass",
        method: "Shake",
        garnish: "None",
        description: "Sample data is shown because the API is unavailable.",
        imagePath: "/assets/icon-384x384.png",
        ingredients: [
            {
                ingredientName: "Bourbon",
                volume: 45,
                unit: "ml",
                imagePath: "/assets/icon-384x384.png",
            },
        ],
        status: "SAMPLE",
    },
];

const fallbackGlass: string[] = ["Old Fashioned", "Highball"];
const fallbackMethod: string[] = ["Shake", "Build"];
const fallbackIngredients: Ingredient[] = [
    {
        ingredientName: "Bourbon",
        enName: "Bourbon",
        category: "Spirit",
        imagePath: "/assets/icon-384x384.png",
        usedCocktail: null,
    },
];

async function getAllCocktail() {
    return fetchWithCookie<ApiEnvelope<Cocktail[]>>(`${BASE_URL}/cocktail/getAll`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

async function getGlass() {
    return fetchWithCookie<ApiEnvelope<string[]>>(`${BASE_URL}/cocktail/glass`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

async function getMethod() {
    return fetchWithCookie<ApiEnvelope<string[]>>(`${BASE_URL}/cocktail/method`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

async function getAllIngredients() {
    return fetchWithCookie<ApiEnvelope<Ingredient[]>>(`${BASE_URL}/ingredient/getAll`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

async function CocktailsPage() {
    const [cocktailData, glassData, methodData, ingredientData] = await Promise.all([
        getAllCocktail(),
        getGlass(),
        getMethod(),
        getAllIngredients()
    ]);
    const isOffline = !cocktailData.ok || !glassData.ok || !methodData.ok || !ingredientData.ok;
    const cocktails = cocktailData.ok ? cocktailData.data?.body ?? [] : [];
    const glass = glassData.ok ? glassData.data?.body ?? [] : [];
    const method = methodData.ok ? methodData.data?.body ?? [] : [];
    const ingredients = ingredientData.ok ? ingredientData.data?.body ?? [] : [];

    return (
        <>
            {isOffline && <OfflineDataNotice pageLabel="Cocktail List" />}
            <CocktailPageBody
                cocktails={cocktails.length > 0 ? cocktails : fallbackCocktails}
                glass={glass.length > 0 ? glass : fallbackGlass}
                method={method.length > 0 ? method : fallbackMethod}
                ingredients={ingredients.length > 0 ? ingredients : fallbackIngredients}
            />
        </>
    );
}

export default CocktailsPage;
