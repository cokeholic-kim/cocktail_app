import { CocktailCardProps } from "@/app/(common)/commonProps";
import { DataViewState } from "@/app/(common)/components/dataStateNotice";
import { IngredientCardData } from "@/app/(ingredients)/ingredients/IngredientCard";

export type DesignLabState = DataViewState;
export type DemoCocktail = CocktailCardProps & { id: string };
export type DemoIngredient = IngredientCardData & { id: string };

export const designLabStateMessages: Record<DesignLabState, string> = {
    ready: "준비됨",
    loading: "로딩 중",
    empty: "데이터 없음",
    error: "오류 발생",
};

export const demoCocktails: DemoCocktail[] = [
    {
        id: "cocktail-afternoon-glow",
        imagePath: "/assets/icon-384x384.png",
        cocktailName: "Afternoon Glow",
        description: "A light citrus base with a syrup finish for warm notes.",
    },
    {
        id: "cocktail-lemon-basil-peach",
        imagePath: "/assets/icon-384x384.png",
        cocktailName: "Lemon Basil Peach",
        description: "Herb-forward and citrusy with a cooling profile.",
    },
];

export const demoIngredients: DemoIngredient[] = [
    {
        id: "ingredient-lemon",
        ingredientName: "Lemon",
        enName: "Lemon",
        category: "Fruit",
        imagePath: "/assets/icon-384x384.png",
    },
    {
        id: "ingredient-mint",
        ingredientName: "Mint",
        enName: "Mint",
        category: "Herb",
        imagePath: "/assets/icon-384x384.png",
    },
    {
        id: "ingredient-whiskey",
        ingredientName: "Whiskey",
        enName: "Whiskey",
        category: "Spirit",
        imagePath: "/assets/icon-384x384.png",
    },
];

export const dataStateLabels: Record<DesignLabState, string> = {
    ready: "Ready",
    loading: "Loading",
    empty: "Empty",
    error: "Error",
};

export const sampleErrorMessage = "Backend is unavailable. Showing fallback preview data.";
