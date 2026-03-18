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
    ready: "기본 데이터가 정상입니다.",
    loading: "로딩 중입니다.",
    empty: "데이터가 없습니다.",
    error: "데이터 조회 실패입니다.",
};

export const demoStateStories = ["ready", "loading", "empty", "error"] as const satisfies ReadonlyArray<DesignLabState>;

export const designLabStateLabels: Record<DesignLabState, string> = {
    ready: "기본",
    loading: "로딩",
    empty: "빈 데이터",
    error: "에러",
};

export const designLabSearchStateMessages = {
    searchResultEmpty: "검색 결과가 없습니다.",
    sourceEmpty: "샘플 데이터가 없습니다.",
};

export const designLabFallbackMessage = "샘플 데이터 조회 실패. 기본 상태로 전환합니다.";

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

export const demoCocktailResponse: Record<DesignLabState, DemoResult<DemoCocktail>> = {
    ready: { ok: true, data: { body: demoCocktails } },
    loading: { ok: false, error: designLabFallbackMessage },
    empty: { ok: true, data: { body: [] } },
    error: {
        ok: false,
        data: { body: demoCocktails },
        error: designLabFallbackMessage,
    },
};

export const demoIngredientResponse: Record<DesignLabState, DemoResult<DemoIngredient>> = {
    ready: { ok: true, data: { body: demoIngredients } },
    loading: { ok: false, error: designLabFallbackMessage },
    empty: { ok: true, data: { body: [] } },
    error: {
        ok: false,
        data: { body: demoIngredients },
        error: designLabFallbackMessage,
    },
};
