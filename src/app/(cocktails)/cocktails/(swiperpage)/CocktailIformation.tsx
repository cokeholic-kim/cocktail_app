import React from 'react'
import { CocktailRequest } from '../AddCocktailSwiper';

interface CocktailInformationProps {
  glass: string[];
  method: string[];
  cocktailRequest: CocktailRequest;
  setCocktailRequest: React.Dispatch<React.SetStateAction<CocktailRequest>>;
}

function CocktailInformation({glass,method,cocktailRequest,setCocktailRequest}:CocktailInformationProps) {
  const handleChange:React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> = (e)=>{
    const {name , value} = e.target;
    setCocktailRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="text-black max-w-2xl mx-auto">
            <div className="mb-5">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cocktailData"
                placeholder="칵테일 이름을 알려주세요"
                name="cocktailName"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-5 flex justify-between">
              <input
                type='number'
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cocktailData"
                placeholder="완성된 칵테일의 도수"
                name="proof"
                onChange={handleChange}
                required
              />
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cocktailData"
                placeholder="어울리는 가니시"
                name="garnish"
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-5 flex justify-between">
              
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cocktailData"
                name="glass"
                onChange={handleChange}
                required
              >
                <option value="">칵테일 잔 선택</option>
                {glass.map((glass:string, index:number) => (
                  <option key={index} value={glass}>
                    {glass}
                  </option>
                ))}
              </select>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cocktailData"
                name="method"
                onChange={handleChange}
                required
              >
                <option value="">기법 선택</option>
                {method.map((method:string, index:number) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5 min-h-52">
              <textarea
                placeholder="칵테일을 만드는 방법을 알려주세요."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-h-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cocktailData"
                name="description"
                onChange={handleChange}
              />
            </div>
          </div>
  )
}

export default CocktailInformation
