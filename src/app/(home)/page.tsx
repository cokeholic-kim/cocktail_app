import { BASE_URL } from "@/app/(common)/common";
import { CocktailCardProps } from "@/app/(common)/commonProps";
import CocktailCard from "./cocktailCard";
import MainBanner from "./MainBanner";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";
import { OfflineDataNotice } from "@/app/(common)/offlineMode";

type ApiEnvelope<T> = {
    body: T;
};

export interface banner {
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

const fallbackBanners: banner[] = [
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
    return fetchWithCookie<ApiEnvelope<banner[]>>(`${BASE_URL}/banner/getAllBanner`, AUTH_COOKIE_NAME, {
        fallback: { body: [] },
    });
}

export default async function Home() {
    const [cocktails, bannersData] = await Promise.all([getCocktail(), getBanner()]);
    const isOffline = !cocktails.ok || !bannersData.ok;
    const cocktailsData: CocktailCardProps[] = cocktails.ok ? cocktails.data?.body ?? [] : [];
    const banners = bannersData.ok ? bannersData.data?.body ?? [] : [];
    const errorMessage = !cocktails.ok ? cocktails.error : !bannersData.ok ? bannersData.error : undefined;

    return (
        <>
            {isOffline && <OfflineDataNotice pageLabel="Home" errorMessage={errorMessage} />}
            <MainBanner banners={banners.length > 0 ? banners : fallbackBanners} />
            <div className="flex justify-start flex-wrap">
                {cocktailsData.length > 0
                    ? cocktailsData.map((cocktail: CocktailCardProps, index: number) => {
                        return (
                            <CocktailCard
                                key={index}
                                imagePath={cocktail.imagePath}
                                cocktailName={cocktail.cocktailName}
                                description={cocktail.description}
                            />
                        );
                    })
                    : fallbackCocktails.map((cocktail: CocktailCardProps, index: number) => (
                        <CocktailCard
                            key={index}
                            imagePath={cocktail.imagePath}
                            cocktailName={cocktail.cocktailName}
                            description={cocktail.description}
                        />
                    ))
                }
            </div>
        </>
    );
}
