import { BASE_URL } from "@/app/(common)/common";
import { CocktailCardProps } from "@/app/(common)/commonProps";
import CocktailCard from "./cocktailCard";
import MainBanner from "./MainBanner";
import { fetchWithCookie } from "@/app/(common)/fetchUtils";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";
import { OfflineDataNotice } from "@/app/(common)/offlineMode";

type ApiEnvelope<T> = {
  body: T;
}

export interface banner {
  imagePath: string;
  title: string;
  src: string;
  order: number;
}

const fallbackCocktails: CocktailCardProps[] = [
  {
    imagePath: "/assets/icon-384x384.png",
    cocktailName: "샘플 칵테일",
    description: "백엔드 미연결 상태에서 UI 확인용 샘플 데이터입니다.",
  },
];

const fallbackBanners: banner[] = [
  {
    imagePath: "/assets/icon-384x384.png",
    title: "샘플 배너",
    src: "/",
    order: 1,
  },
];

async function getCocktail() {
  return fetchWithCookie<ApiEnvelope<CocktailCardProps[]>>(`${BASE_URL}/cocktail/getAll`, AUTH_COOKIE_NAME, {
    fallback: { body: [] },
  })
}

async function getBanner() {
  return fetchWithCookie<ApiEnvelope<banner[]>>(`${BASE_URL}/banner/getAllBanner`, AUTH_COOKIE_NAME, {
    fallback: { body: [] },
  })
}

export default async function Home() {
  const [cocktails, bannersData] = await Promise.all([getCocktail(), getBanner()]);
  const isOffline = !cocktails.ok || !bannersData.ok;
  const cocktailsData: CocktailCardProps[] = cocktails.ok ? cocktails.data.body : fallbackCocktails;
  const banners: banner[] = bannersData.ok ? bannersData.data.body : fallbackBanners;

  return (
    <>
      {isOffline && <OfflineDataNotice pageLabel="홈" />}
      <MainBanner banners={banners} />
      <div className="flex justify-start flex-wrap">
        {cocktailsData.map((cocktail: CocktailCardProps, index: number) => {
          return (
            <CocktailCard
              key={index}
              imagePath={cocktail.imagePath}
              cocktailName={cocktail.cocktailName}
              description={cocktail.description}
            />
          );
        })}
      </div>
    </>
  );
}
