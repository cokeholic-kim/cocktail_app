import { Suspense, useEffect, useState } from "react";
import { BASE_URL } from "@/app/(common)/common";
import Ingredients from "./Ingredients";




function FitCocktail() {
    
  return (
    <Suspense fallback={<div>...Loading</div>}>

      <Ingredients></Ingredients>
    </Suspense>
  )
}

export default FitCocktail
