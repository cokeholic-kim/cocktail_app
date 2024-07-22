export interface CocktailCardProps {
    imagePath: string;
    cocktailName: string;
    description: string | null;
  }

export interface CocktailFit{
    cocktailName:string;
    imagePath:string;
    includeIngredients:string[];
    excludeIngredient:string[];
}