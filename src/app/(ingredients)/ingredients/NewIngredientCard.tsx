import { useLoginContext } from '@/app/(context)/LoginContext';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React from 'react'

function NewIngredientCard({handleClickNewIngredient}:{handleClickNewIngredient:()=>void}) {
  const { isLogin , setIsLogin } = useLoginContext();
  const router = useRouter();

  return (
    <div className="md:w-1/4 w-1/3 p-6 
    bg-white border border-gray-200 
    rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    onClick={isLogin ? ()=>handleClickNewIngredient():()=> router.push('/login')}
    >
      <div className="w-full h-44 mb-4 relative">
        <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
          <Image
            src={"/assets/questionMark.png"}
            alt={"새로운재료"}
            width={400}
            height={300}
            className="rounded-t-lg w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="mb-4">
        <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
          {isLogin ? "찾으시는 재료가 없다면 등록해주세요":"로그인후 이용 가능합니다"}
        </p>
      </div>
    </div>
  )
}

export default NewIngredientCard
