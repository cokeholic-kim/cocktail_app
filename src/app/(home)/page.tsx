import { BASE_URL } from "../(common)/common";
import { CocktailCardProps } from "../(common)/commonProps";
import CocktailCard from "./cocktailCard";
import MainBanner from "./MainBanner";
import { fetchWithCookie, AUTH_COOKIE_NAME } from "../(common)/fetchUtils";

type ApiEnvelope<T> = {
  body: T;
}

export interface banner {
  imagePath: string;
  title: string;
  src: string;
  order: number;
}


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
  const [cocktails, bannersData] = await Promise.all([getCocktail(), getBanner()])

  if (!cocktails.ok || !bannersData.ok) {
    return (
      <div className="m-6 text-sm rounded border border-amber-300 bg-amber-50 p-4 text-amber-900">
        현재 백엔드가 일시적으로 응답하지 않습니다. 페이지의 데이터가 일부 비어 있을 수 있습니다.
      </div>
    )
  }

  const cocktailsData: CocktailCardProps[] = cocktails.data.body;
  const banners: banner[] = bannersData.data.body;

  return (
    <>
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
