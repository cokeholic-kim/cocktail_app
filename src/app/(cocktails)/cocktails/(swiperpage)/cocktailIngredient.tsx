import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { CocktailRequest } from '../AddCocktailSwiper';
import SimpleIngredientCard from '@/app/(myingredients)/myingredients/SimpleIngredientCard';
import { IngredientChecked } from '@/app/(myingredients)/myingredients/MyIngredientBody';
import NewIngredientForm from './(newIngredient)/NewIngredientForm';

interface CocktailIngredientProps{
    ingredients:IngredientChecked[],
    cocktailRequest: CocktailRequest,
    setCocktailRequest: React.Dispatch<React.SetStateAction<CocktailRequest>>
}




function NewIngredientCard({handleClickNewIngredient}:{handleClickNewIngredient:()=>void}){
  return (
      <div className="md:w-1/3 w-1/3 p-6 
      bg-white border border-gray-200 
      rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      onClick={handleClickNewIngredient}
      >
        <div className="w-full h-44 mb-4 relative">
          <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
            <Image
              src={"/assets/questionMark.png"}
              alt={"새로운재료"}
              width={400}
              height={300}
              className="rounded-t-lg w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="mb-4">
          <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
            {"찾으시는 재료가 없다면 등록해주세요"}
          </p>
        </div>
      </div>
    );
}



function CocktailIngredient({ingredients,cocktailRequest,setCocktailRequest}:CocktailIngredientProps) {
  const [ingredientData, setIngredientData] = useState<IngredientChecked[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState<
    IngredientChecked[]
  >([]);
  const [newIngredient, setNewIngredient] = useState(false);

  const handleClickNewIngredient = () => {
    setNewIngredient(!newIngredient);
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
      {newIngredient ? null : 
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
        className="flex justify-start flex-wrap overflow-y-scroll overflow-x-hidden"
        style={{ height: "80vh" }}
      >
        {
          newIngredient ? (
            <NewIngredientForm />
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
            newIngredient ? null:<NewIngredientCard
            handleClickNewIngredient={handleClickNewIngredient}
          />
          }
        
      </div>
    </div>
  );
}

export default CocktailIngredient
