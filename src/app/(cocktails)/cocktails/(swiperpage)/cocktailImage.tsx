import Image from 'next/image'
import React from 'react'
import { CocktailRequest } from './../AddCocktailSwiper';

interface CocktailImageProps{
    cocktailRequest: CocktailRequest;
    setCocktailRequest: React.Dispatch<React.SetStateAction<CocktailRequest>>;
}

function CocktailImage({cocktailRequest,setCocktailRequest}:CocktailImageProps) {
    const handleFileChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if( e.target.files && e.target.files.length > 0){
          setCocktailRequest((prevState) => ({
            ...prevState || {},
            image: e.target.files![0],
          }));
        }
      }

  return (
    <div>
    <h1>칵테일의 사진이 있다면 같이 올려주세요</h1>
    {cocktailRequest.image && (
       <div className="w-full mb-4 relative" style={{height:"60vh"}}>
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
    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:bg-slate-800 file:text-white" id="file_input" type="file" onChange={handleFileChange}/>
  </div>
  )
}

export default CocktailImage
