import { BASE_URL } from "../(common)/common";
import { CocktailCardProps } from "../(common)/commonProps";
import CocktailCard from "./cocktailCard";



async function getCocktail() {
  return fetch(`${BASE_URL}/cocktail/getAll`).then((response) =>
    response.json()
  );
}

export default async function Home() {
  const cocktails = await getCocktail();

  return (
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
  );
}
