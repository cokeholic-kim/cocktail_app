import Link from "next/link";

function IngredientModal({includeIngredients,excludeIngredients}:{includeIngredients:string[],excludeIngredients:string[]}) {
  return (
    <div className="bg-slate-100 absolute min-h-36 min-w-44 rounded-xl p-5 z-10 left-20 top-0">
      <div className="mb-3">
        <p className="text-yellow-300">가진 재료</p>
        <hr className="border-black"></hr>
        {includeIngredients.map((ingredient, index) => {
          return (
            <p key={index}>
              <Link href={`/ingredients/${ingredient}`} className="mr-3">
                {ingredient}
              </Link>
            </p>
          );
        })}
      </div>
      {
        excludeIngredients.length !== 0 &&
        <div>
        <p className="text-red-600">필요한 재료</p>
        <hr className="border-black"></hr>
        {excludeIngredients.map((ingredient, index) => {
          return (
            <p key={index}>
              <Link href={`/ingredients/${ingredient}`} className="mr-3">
                {ingredient}
              </Link>
            </p>
          );
        })}
      </div>
      }
      
    </div>
  );
}

export default IngredientModal
