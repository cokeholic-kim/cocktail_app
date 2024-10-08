import Image from 'next/image';
import Link from 'next/link';
import { Ingredient } from './page';


function IngredientCard({ingredient,size}: {ingredient: Ingredient,size:string}) {
  return (
    <div className={`p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${size.length > 0 ? size : ''}`}>
      <div className="w-full h-44 mb-4 relative">
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
        <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
          {ingredient.ingredientName}
        </p>
      </div>
      <div className="mb-6">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {ingredient.enName}
        </p>
      </div>
      <div className="mb-6">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {ingredient.category}
        </p>
      </div>
      <div>
        <Link
          href={`/ingredients/${ingredient.ingredientName}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
      
    

  );
}

export default IngredientCard
