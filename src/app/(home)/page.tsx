import { BASE_URL } from "../(common)/common";
import { CocktailCardProps } from "../(common)/commonProps";
import CocktailCard from "./cocktailCard";
import MainBanner from "./MainBanner";

export interface banner {
  imagePath: string;
  title: string;
  src: string;
  order: number;
}

async function getCocktail() {
  return fetch(`${BASE_URL}/cocktail/getAll`).then((response) =>
    response.json()
  );
}

async function getBanner() {
  return fetch(`${BASE_URL}/banner/getAllBanner`).then((response) =>
    response.json()
  );
}

export default async function Home() {
  const cocktails = await getCocktail();
  const bannersData = await getBanner();
  const banners: banner[] = bannersData.body;

  return (
    <>
      <MainBanner banners={banners}/>
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
