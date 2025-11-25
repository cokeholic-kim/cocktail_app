import { BASE_URL } from "../(common)/common";
import { CocktailCardProps } from "../(common)/commonProps";
import CocktailCard from "./cocktailCard";
import MainBanner from "./MainBanner";
import { fetchWithCookie, AUTH_COOKIE_NAME } from "../(common)/fetchUtils";

export interface banner {
  imagePath: string;
  title: string;
  src: string;
  order: number;
}


async function getCocktail() {
  return fetchWithCookie(`${BASE_URL}/cocktail/getAll`, AUTH_COOKIE_NAME)
}

async function getBanner() {
  return fetchWithCookie(`${BASE_URL}/banner/getAllBanner`, AUTH_COOKIE_NAME)
}

export default async function Home() {
  const [cocktails, bannersData] = await Promise.all([getCocktail(), getBanner()])

  const banners: banner[] = bannersData.body;

  return (
    <>
      <MainBanner banners={banners} />
      <div className="flex justify-start flex-wrap">
        {cocktails.body.map((cocktail: CocktailCardProps, index: number) => {
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
