import { useRef } from "react"
import AddCocktailSwiper from "./AddCocktailSwiper";
import { Ingredient } from "@/app/(ingredients)/ingredients/page";

interface AddCocktailModalProps {
  glass: string[];
  method: string[];
  ingredients: Ingredient[];
  setModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
}

function AddCocktailModal({glass,method,ingredients,setModalOpen}:AddCocktailModalProps) {
  return (
    <div className="z-50 absolute">
      <div className=" fixed inset-0 bg-black bg-opacity-70 flex justify-center">
        <div
          className="
          relative max-w-4xl shadow-black bg-slate-200 
          overflow-hidden rounded-lg transition-all
          duration-500 animate-[fadeIn_400ms_ease-in-out]"
        >
          <span
            onClick={()=>setModalOpen(false)}
            className="absolute right-5 top-5 cursor-pointer z-40 text-white"
          >
            X
          </span>
          <div className="p-10">
            <AddCocktailSwiper glass={glass} method={method} ingredients={ingredients}></AddCocktailSwiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCocktailModal
