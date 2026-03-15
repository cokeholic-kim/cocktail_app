import AddCocktailSwiper from "./AddCocktailSwiper";
import { Ingredient } from "@/app/(ingredients)/ingredients/page";

interface AddCocktailModalProps {
    glass: string[];
    method: string[];
    ingredients: Ingredient[];
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddCocktailModal({ glass, method, ingredients, setModalOpen }: AddCocktailModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            role="dialog"
            aria-modal="true"
            onClick={() => setModalOpen(false)}
        >
            <section
                className="relative z-10 max-w-4xl rounded-lg bg-slate-200 shadow-black transition-all duration-500 overflow-hidden"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="absolute right-5 top-5 z-20 cursor-pointer text-white"
                    aria-label="모달 닫기"
                >
                    X
                </button>
                <div className="p-10">
                    <AddCocktailSwiper glass={glass} method={method} ingredients={ingredients} />
                </div>
            </section>
        </div>
    );
}
