import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CocktailRequest } from '../AddCocktailSwiper';
import SimpleIngredientCard from '@/app/(myingredients)/myingredients/SimpleIngredientCard';
import { IngredientChecked } from '@/app/(myingredients)/myingredients/MyIngredientBody';
import NewIngredientForm from './(newIngredient)/NewIngredientForm';
import NewIngredientCard from '@/app/(ingredients)/ingredients/NewIngredientCard';

interface CocktailIngredientProps{
    ingredients:IngredientChecked[],
    cocktailRequest: CocktailRequest,
    setCocktailRequest: React.Dispatch<React.SetStateAction<CocktailRequest>>
}

function CocktailIngredient({ingredients,cocktailRequest,setCocktailRequest}:CocktailIngredientProps) {
  const [ingredientData, setIngredientData] = useState<IngredientChecked[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState<
    IngredientChecked[]
  >([]);
  const [newIngredientPage, setNewIngredientPage] = useState(false);

  const handleClickNewIngredient = () => {
    setNewIngredientPage(!newIngredientPage);
  };

  useEffect(() => {
    setIngredientData(ingredients);
  },[]);

  const handleCheck = (ingredient: IngredientChecked) => {
    setIngredientData((prevIngredientData) =>
      prevIngredientData.map((item) =>
        item.ingredientName === ingredient.ingredientName
          ? { ...item, checked: !item.checked }
          : item
      )
    );

    setCheckedIngredients((prevCheckedIngredients) => {
      const existingIngredient = prevCheckedIngredients.find(
        (item) => item.ingredientName === ingredient.ingredientName
      );

      if (existingIngredient) {
        return prevCheckedIngredients.filter(
          (item) => item.ingredientName !== ingredient.ingredientName
        );
      } else {
        return [...prevCheckedIngredients, ingredient];
      }
    });

    setCocktailRequest((prevState) => ({
      ...prevState,
      ingredients: prevState.ingredients.includes(ingredient)
        ? prevState.ingredients.filter((item) => item !== ingredient)
        : [...prevState.ingredients, ingredient],
    }));

    console.log(cocktailRequest.ingredients);
  };
  return (
    <div className="">
      {newIngredientPage ? null : 
      <>
        <h1>재료를 선택해 주세요.</h1>
        <nav
          className={`flex justify-between items-center px-6 py-5   w-full z-10 transition-all duration-500 "bg-black"`}
        >
          <input
            className="bg-gray-800 rounded-md text-white px-3 py-2 w-96 focus:outline-none"
            type="text"
            placeholder="재료를 검색해 주세요"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </nav>
      </>
      }
      <div
        className="flex justify-start flex-wrap overflow-y-scroll overflow-x-hidden h-full"
        style={{ height: "80vh" }}
      >
        {
          newIngredientPage ? (
            <NewIngredientForm setNewIngredientPage={setNewIngredientPage}/>
          )
          :searchValue === ""
          ? ingredientData.map((ingredient, index) => (
              <SimpleIngredientCard
                key={index}
                ingredient={ingredient}
                handleCheck={handleCheck}
                checked={ingredient.checked!}
              />
            ))
          : ingredientData
              .filter((ingredient) =>
                ingredient.ingredientName.includes(searchValue)
              )
              .map((ingredient, index) => (
                <SimpleIngredientCard
                  key={index}
                  ingredient={ingredient}
                  handleCheck={handleCheck}
                  checked={ingredient.checked!}
                />
              ))
          }
          {
            newIngredientPage ? null:<NewIngredientCard
            handleClickNewIngredient={handleClickNewIngredient}
          />
          }
        
      </div>
    </div>
  );
}

export default CocktailIngredient
