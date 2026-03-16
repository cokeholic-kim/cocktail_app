import { CocktailCardProps } from "@/app/(common)/commonProps";
import { DataViewState } from "@/app/(common)/components/dataStateNotice";
import { IngredientCardData } from "@/app/(ingredients)/ingredients/IngredientCard";

export type DesignLabState = DataViewState;
export type DemoCocktail = CocktailCardProps & { id: string };
export type DemoIngredient = IngredientCardData & { id: string };

export interface HomeBanner {
    imagePath: string;
    title: string;
    src: string;
    order: number;
}

export type DemoResult<T> = {
    ok: boolean;
    data?: {
        body: T[];
    };
    error?: string | null;
};

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

export const sampleErrorMessage =
    "백엔드가 연결되지 않아 샘플 데이터로 미리보기를 표시합니다.";

export const demoCocktailResponse: Record<DesignLabState, DemoResult<DemoCocktail>> = {
    ready: { ok: true, data: { body: demoCocktails } },
    loading: { ok: false, error: sampleErrorMessage },
    empty: { ok: true, data: { body: [] } },
    error: {
        ok: false,
        data: { body: demoCocktails },
        error: sampleErrorMessage,
    },
};

export const demoIngredientResponse: Record<DesignLabState, DemoResult<DemoIngredient>> = {
    ready: { ok: true, data: { body: demoIngredients } },
    loading: { ok: false, error: sampleErrorMessage },
    empty: { ok: true, data: { body: [] } },
    error: {
        ok: false,
        data: { body: demoIngredients },
        error: sampleErrorMessage,
    },
};
