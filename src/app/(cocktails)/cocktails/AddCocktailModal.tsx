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
      <button
        type="button"
        className="fixed inset-0 bg-black bg-opacity-70"
        aria-label="칵테일 추가 모달 닫기"
        onClick={() => setModalOpen(false)}
      />
      <div className=" fixed inset-0 bg-black bg-opacity-70 flex justify-center">
        <section
          className="relative max-w-4xl shadow-black bg-slate-200 overflow-hidden rounded-lg transition-all duration-500 animate-[fadeIn_400ms_ease-in-out]"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="absolute right-5 top-5 cursor-pointer z-40 text-white"
            aria-label="모달 닫기"
          >
            X
          </button>
          <div className="p-10">
            <AddCocktailSwiper glass={glass} method={method} ingredients={ingredients}></AddCocktailSwiper>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddCocktailModal
