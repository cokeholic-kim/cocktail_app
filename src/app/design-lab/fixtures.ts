import { CocktailCardProps } from "@/app/(common)/commonProps";
import { DataViewState } from "@/app/(common)/components/dataStateNotice";
import { IngredientCardData } from "@/app/(ingredients)/ingredients/IngredientCard";

export type DesignLabState = DataViewState;

export const demoCocktails: CocktailCardProps[] = [
    {
        imagePath: "/assets/icon-384x384.png",
        cocktailName: "Afternoon Glow",
        description: "A light citrus base with a syrup finish for warm notes.",
    },
    {
        imagePath: "/assets/icon-384x384.png",
        cocktailName: "Lemon Basil Peach",
        description: "Herb-forward and citrusy with a cooling profile.",
    },
];

export const demoIngredients: IngredientCardData[] = [
    {
        ingredientName: "Lemon",
        enName: "Lemon",
        category: "Fruit",
        imagePath: "/assets/icon-384x384.png",
    },
    {
        ingredientName: "Mint",
        enName: "Mint",
        category: "Herb",
        imagePath: "/assets/icon-384x384.png",
    },
    {
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
