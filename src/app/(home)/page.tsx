import CocktailCard from "./cocktailCard";

export const BASE_URL = "http://localhost:8082"

interface CocktailCardProps {
  imagePath: string;
  cocktailName: string;
  description: string;
}

async function getCocktail() {
  return fetch(BASE_URL + "/cocktail/getAll").then((response) =>
    response.json()
  );
}

export default async function Home() {
  const cocktails = await getCocktail();
  return (
    <div>
      <div className="flex justify-start flex-wrap">
        {
        cocktails.body.map((cocktail:CocktailCardProps,index:number) => {
          return <CocktailCard 
            key={index}
            imagePath={cocktail.imagePath}
            name={cocktail.cocktailName}
            description={cocktail.description}
          />
        })  
      }
      </div>
    </div>
  );
}
