"use client"

import { useLoginContext } from '@/app/(context)/LoginContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface AddCocktailProps {
    imagePath: string;
    name: string;
    description: string;
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
  }

function AddCocktailCard({imagePath,name,description,setModalOpen}:AddCocktailProps) {
  const { isLogin , setIsLogin } = useLoginContext();
  const router = useRouter()


  return (
    <div className="md:w-1/4 w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-44 mb-4 relative">
      <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
      <Image
          src={imagePath}
          alt={name}
          width={400}
          height={300}
          className="rounded-t-lg w-full h-full object-contain"
        />
      </div>
      </div>
      <div className="mb-4">
        <p className="font-normal text-gray-700 dark:text-gray-400 text-lg">
          {name}
        </p>
      </div>
      <div className="mb-6">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={isLogin ? ()=>setModalOpen(true):() => router.push('/login')}
        >
            
            { isLogin ? "Add SpecialCocktail": "로그인후 이용 가능합니다."}
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
        </button>
      </div>
    </div>
  );
}

export default AddCocktailCard
