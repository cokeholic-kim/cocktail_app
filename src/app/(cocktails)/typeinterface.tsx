export interface Ingredient{
    ingredientName: string;
    volume: number;
    unit: string;
    imagePath: string;
  }
  
export interface Cocktail{
    cocktailName: string;
    proof: number;
    glass: string;
    method: string;
    garnish: string;
    description: string | null;
    imagePath: string;
    ingredients: Ingredient[];
    status:string,
  }