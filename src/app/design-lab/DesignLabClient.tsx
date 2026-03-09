"use client";

import React, { useMemo, useState } from 'react';
import SearchBox from '@/app/common/components/searchBox';
import CocktailCard from '@/app/(home)/cocktailCard';
import IngredientCard, { IngredientCardData } from '@/app/(ingredients)/ingredients/IngredientCard';
import NewIngredientCard from '@/app/(ingredients)/ingredients/NewIngredientCard';
import { CocktailCardProps } from '@/app/(common)/commonProps';

const demoCocktails: CocktailCardProps[] = [
  {
    imagePath: '/assets/icon-384x384.png',
    cocktailName: '오후의 햇살',
    description: '라임과 시럽으로 가볍게 마무리되는 달콤한 베이스 칵테일',
  },
  {
    imagePath: '/assets/icon-384x384.png',
    cocktailName: '레몬 바질 피치',
    description: '허브 향과 산미가 살아있는 쿨링 타입 칵테일',
  },
];

const demoIngredients: IngredientCardData[] = [
  {
    ingredientName: '레몬',
    enName: 'Lemon',
    category: '과일류',
    imagePath: '/assets/icon-384x384.png',
  },
  {
    ingredientName: '민트',
    enName: 'Mint',
    category: '허브류',
    imagePath: '/assets/icon-384x384.png',
  },
  {
    ingredientName: '위스키',
    enName: 'Whiskey',
    category: '증류주',
    imagePath: '/assets/icon-384x384.png',
  },
];

function filterBySearch<T extends { [key: string]: any }>(items: T[], keyword: string, field: keyof T) {
  if (!keyword) return items;
  return items.filter((item) => `${item[field]}`.toLowerCase().includes(keyword.toLowerCase()));
}

export default function DesignLabClient() {
  const [cocktailSearch, setCocktailSearch] = useState('');
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [newIngredientRequested, setNewIngredientRequested] = useState(false);

  const filteredCocktails = useMemo(() => {
    return filterBySearch(demoCocktails, cocktailSearch, 'cocktailName');
  }, [cocktailSearch]);

  const filteredIngredients = useMemo(() => {
    return filterBySearch(demoIngredients, ingredientSearch, 'ingredientName');
  }, [ingredientSearch]);

  return (
    <main className="px-4 py-8 space-y-10">
      <section className="p-4 border rounded-xl bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">로그인 상태 토글</h2>
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="px-4 py-2 rounded bg-slate-900 text-white text-sm"
        >
          현재 로그인 상태: {isLogin ? 'ON' : 'OFF'} (클릭 토글)
        </button>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-2">CocktailCard 컴포넌트</h1>
        <p className="text-sm text-gray-500 mb-4">백엔드 없이도 바로 확인 가능한 디자인 검토 샘플</p>
        <SearchBox placeHolder="칵테일 검색" setSearchValue={setCocktailSearch} />
        <div className="mt-4 flex justify-start flex-wrap">
          {filteredCocktails.map((cocktail, index) => (
            <CocktailCard
              key={index}
              imagePath={cocktail.imagePath}
              cocktailName={cocktail.cocktailName}
              description={cocktail.description}
            />
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-2">IngredientCard 컴포넌트</h1>
        <p className="text-sm text-gray-500 mb-4">칵테일 페이지에서 독립적으로 사용 가능한 형태</p>
        <SearchBox placeHolder="재료 검색" setSearchValue={setIngredientSearch} />
        <div className="mt-4 flex justify-start flex-wrap">
          {filteredIngredients.map((ingredient, index) => (
            <IngredientCard key={index} ingredient={ingredient} size="md:w-1/4 w-1/3" />
          ))}
          <NewIngredientCard
            handleClickNewIngredient={() => setNewIngredientRequested((prev) => !prev)}
            isLogin={isLogin}
            onRequestLogin={() => setIsLogin(true)}
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">새 재료 등록 요청 상태: {newIngredientRequested ? '요청됨' : '대기'}</p>
      </section>
    </main>
  );
}
