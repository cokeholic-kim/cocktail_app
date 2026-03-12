"use client"

import Image from 'next/image';
import Link from 'next/link';
import { CocktailCardProps } from '../(common)/commonProps';
import { uiTokenStyles } from '@/app/(common)/components/uiTokens';

function CocktailCard({imagePath,cocktailName,description}:CocktailCardProps) {
  


  return (
    <div className={`md:w-1/4 w-1/2 p-6 ${uiTokenStyles.card.base}`}>
      <div className="w-full h-44 mb-4 relative">
      <div className={uiTokenStyles.card.imageFrame}>
      <Image
          src={imagePath}
          alt={cocktailName}
          width={400}
          height={300}
          className="rounded-t-lg w-full h-full object-contain"
        />
      </div>
      </div>
      <div className="mb-4">
        <p className={uiTokenStyles.card.title}>
          {cocktailName}
        </p>
      </div>
      <div className="mb-6">
        <p className={uiTokenStyles.card.description}>
          {description}
        </p>
      </div>
      <div>
        <Link
          href={`/cocktails/${cocktailName}`}
          className={uiTokenStyles.button.primary}
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
      
    

  );
}

export default CocktailCard
