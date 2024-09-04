import Image from 'next/image';
import React from 'react'
import { CocktailRequest } from './../AddCocktailSwiper';
import { Ingredient } from '@/app/(ingredients)/ingredients/page';
import { getCookie } from 'cookies-next';
import { BASE_URL } from '@/app/(common)/common';

interface FinalCocktailProps{
    cocktailRequest: CocktailRequest;
    setCocktailRequest: React.Dispatch<React.SetStateAction<CocktailRequest>>;
}

interface SimpleIngredientCardProps{
  ingredient:Ingredient;
  setCocktailRequest: React.Dispatch<React.SetStateAction<CocktailRequest>>;
}

function SimpleIngredientCard({ingredient,setCocktailRequest}:SimpleIngredientCardProps){
  
  const handleChange = (ingredientName:String,fieldName:string,event:React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>) => {
    setCocktailRequest((prevState) => ({
     ...prevState,
      ingredients: prevState.ingredients.map((item) => 
        item.ingredientName === ingredientName
        ? {...item,[fieldName]:event.target.value}
        : item
      )
    }));
  }


  return (
    <div
      className={`md:w-1/4 w-1/3 p-6 border border-gray-200 rounded-lg shadow`}
    >
      <div className="w-full h-32 mb-4 relative">
        <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
          <Image
            src={ingredient.imagePath}
            alt={ingredient.ingredientName}
            width={400}
            height={300}
            className="rounded-t-lg w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="mb-4">
        <p className={`font-normal  dark:text-gray-400 text-lg  `}>
          {ingredient.ingredientName}
        </p>
        <input type='number' placeholder='용량' className='w-3/4 border  rounded ' onChange={(event)=>handleChange(ingredient.ingredientName,"volume",event)}/>
        <select onChange={(event)=>handleChange(ingredient.ingredientName,"unit",event)}>
          <option>단위</option>
          <option value="mL">mL</option>
          <option value="OZ">OZ</option>
          <option value="ts">ts</option>
          <option value="TS">TS</option>
          <option value="DASH">DASH</option>
        </select>
      </div>
    </div>
  );
}

function FinalCocktail({cocktailRequest,setCocktailRequest}:FinalCocktailProps) {
  const checkAllField = (cocktaulRequest:CocktailRequest) => {
    if(
      cocktailRequest.cocktailName.trim() !== "" &&
      cocktailRequest.ingredients.length > 0 &&
      cocktailRequest.ingredients.every(
        (ingredient) =>
          ingredient.ingredientName.trim() !== "" &&
          ingredient.volume !== undefined &&
          ingredient.unit !== undefined
      ) &&
      cocktailRequest.description.trim() !== "" &&
      cocktailRequest.glass.trim() !== "" &&
      cocktailRequest.method.trim() !== "" &&
      cocktailRequest.proof !== undefined &&
      cocktailRequest.image !== null 
    ) return true;
  }

  const handleSubmit = async () => {
    if(checkAllField(cocktailRequest)){
      const formData = new FormData();
      formData.append("cocktailName",cocktailRequest.cocktailName)
      
      // formData.append("ingredients",JSON.stringify(cocktailRequest.ingredients.map(ingredient => ingredient.ingredientName)))
      for (let i = 0; i < cocktailRequest.ingredients.length; i++) {
        formData.append(
          `ingredients[${i}]`,
          JSON.stringify({
            name: cocktailRequest.ingredients[i].ingredientName,
            volume: Number(cocktailRequest.ingredients[i].volume),
            unit: cocktailRequest.ingredients[i].unit,
          })
        );
      }
      formData.append("proof",cocktailRequest.proof.toString())
      formData.append("glass",cocktailRequest.glass)
      formData.append("method",cocktailRequest.method)
      formData.append("garnish",cocktailRequest.garnish)
      if (cocktailRequest.image instanceof File) {
        formData.append("image", cocktailRequest.image);
      }
      formData.append("description",cocktailRequest.description)
      try{
        const authToken = getCookie('Authorization')
        const response = await fetch(`${BASE_URL}/user/saveCocktail`, {
          method: "POST",
          headers: {
            "Authorization": `${authToken}`
          },
          body:formData,
        });

        if(response.ok) {
          alert(`${cocktailRequest.cocktailName} 이 저장되었습니다.`)
        } else{
          console.error("Error submitting cocktail request:", response.status);
        }
      }catch (error){
        console.error("Error submitting cocktail request:", error);
      }
    }else{
      alert('등록할 칵테일 정보를 모두 입력해 주세요')
    }
  }



  return (
    <div>
      <button onClick={handleSubmit} className="bg-black text-white rounded-md px-4 py-2 flex items-center space-x-2">
    <span>이 칵테일로 저장</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
</button>

              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className='flex'>
                  {cocktailRequest.image && (
                    <div
                      className="w-1/2 mb-4 relative"
                      style={{ height: "30vh" }}
                    >
                      <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
                        <Image
                          src={URL.createObjectURL(cocktailRequest.image)}
                          alt="Uploaded Cocktail"
                          width={400}
                          height={400}
                          className="rounded-t-lg w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <div className='ml-3 text-slate-600'>
                    <div className='flex'>
                      <p>칵테일 이름 : </p>
                      <p>{cocktailRequest.cocktailName}</p>
                    </div>
                    <div className='flex'>
                      <p>기법 : </p>
                      <p>{cocktailRequest.method}</p>
                    </div>
                    <div className='flex'>
                      <p>잔 : </p>
                      <p>{cocktailRequest.glass}</p>
                    </div>
                    <div className='flex'>
                      <p>도수 : </p>
                      <p>{cocktailRequest.proof}</p>
                    </div>
                    <div className=''>
                      <p>{cocktailRequest.description}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Ingredients</p>
                </div>
                <div className='flex'>
                  
                  {cocktailRequest.ingredients.map((ingredient, index) => {
                     return (
                       <SimpleIngredientCard ingredient={ingredient} setCocktailRequest={setCocktailRequest} key={index}/>
                     );
                  })}
                 
                </div>
              </div>
            </div>
  )
}

export default FinalCocktail
