import { BASE_URL } from "@/app/(common)/common";
import { CocktailCardProps } from "@/app/(common)/commonProps";
import CocktailCard from "./cocktailCard";
import MainBanner from "./MainBanner";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";
import { uiTokenStyles } from "@/app/(common)/components/uiTokens";
import {
    DataStateNotice,
    DataViewState,
    normalizeErrorMessage,
    resolveDataState,
} from "@/app/(common)/components/dataStateNotice";

type ApiEnvelope<T> = {
    body: T;
};

type HomePageState = Exclude<DataViewState, "loading">;

export interface HomeBanner {
    imagePath: string;
    title: string;
    src: string;
    order: number;
}

const fallbackCocktails: CocktailCardProps[] = [
    {
        imagePath: "/assets/icon-384x384.png",
        cocktailName: "Sample Cocktail",
        description: "No backend connection. UI preview is shown with fallback data.",
    },
];

const fallbackBanners: HomeBanner[] = [
    {
        imagePath: "/assets/icon-384x384.png",
        title: "Cocktail App",
        src: "/",
        order: 1,
    },
];

async function getCocktail() {
    return fetchWithCookie<ApiEnvelope<CocktailCardProps[]>>(`${BASE_URL}/cocktail/getAll`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

async function getBanner() {
    return fetchWithCookie<ApiEnvelope<HomeBanner[]>>(`${BASE_URL}/banner/getAllBanner`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

export default async function Home() {
    const [cocktails, bannersData] = await Promise.all([getCocktail(), getBanner()]);
    const cocktailsData: CocktailCardProps[] = cocktails.ok ? cocktails.data?.body ?? [] : [];
    const banners = bannersData.ok ? bannersData.data?.body ?? [] : [];
    const bannerErrorMessage = normalizeErrorMessage([bannersData.error]);
    const cocktailErrorMessage = normalizeErrorMessage([cocktails.error]);
    const bannerState: HomePageState = resolveDataState(bannersData.ok, banners.length > 0);
    const cocktailState: HomePageState = resolveDataState(cocktails.ok, cocktailsData.length > 0);

    return (
        <main className={uiTokenStyles.layout.section}>
            <DataStateNotice state={bannerState} pageLabel="Home Banner" message={bannerErrorMessage} />
            <MainBanner banners={banners.length > 0 ? banners : fallbackBanners} />
            <DataStateNotice state={cocktailState} pageLabel="Home Cocktail" message={cocktailErrorMessage} />
            <div className={uiTokenStyles.layout.content}>
                {(cocktailsData.length > 0 ? cocktailsData : fallbackCocktails).map((cocktail, index) => (
                    <CocktailCard
                        key={index}
                        imagePath={cocktail.imagePath}
                        cocktailName={cocktail.cocktailName}
                        description={cocktail.description}
                    />
                ))}
            </div>
        </main>
    );
}
