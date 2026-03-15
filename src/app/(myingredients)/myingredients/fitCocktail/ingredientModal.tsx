import Link from "next/link";
import { encodeRouteSegment } from '@/app/(common)/securityValidation';

function IngredientModal({ includeIngredients, excludeIngredients }: { includeIngredients: string[]; excludeIngredients: string[] }) {
  return (
    <div
      className="bg-slate-100 absolute min-h-36 min-w-44 rounded-xl p-5 z-10 left-20 top-0"
      role="status"
      aria-live="polite"
    >
      <div className="mb-3">
        <p className="text-yellow-300">Include Ingredients</p>
        <hr className="border-black"></hr>
        {includeIngredients.map((ingredient, index) => {
          return (
            <p key={index}>
              <Link
                href={`/ingredients/${encodeRouteSegment(ingredient)}`}
                className="mr-3"
                aria-label={`${ingredient} 상세 보기`}
              >
                {ingredient}
              </Link>
            </p>
          );
        })}
      </div>
      {excludeIngredients.length !== 0 && (
        <div>
          <p className="text-red-600">Exclude Ingredients</p>
          <hr className="border-black"></hr>
          {excludeIngredients.map((ingredient, index) => {
            return (
              <p key={index}>
                <Link
                  href={`/ingredients/${encodeRouteSegment(ingredient)}`}
                  className="mr-3"
                  aria-label={`${ingredient} 상세 보기`}
                >
                  {ingredient}
                </Link>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default IngredientModal;
