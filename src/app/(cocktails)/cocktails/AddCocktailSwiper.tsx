"use client"

import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from "swiper"
import { Navigation, Scrollbar } from 'swiper/modules';
import { Ingredient } from '@/app/(ingredients)/ingredients/page';
import CocktailInformation from './(swiperpage)/CocktailIformation';
import CocktailIngredient from './(swiperpage)/cocktailIngredient';
import CocktailImage from './(swiperpage)/cocktailImage';
import FinalCocktail from './(swiperpage)/finalCocktail';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

export interface CocktailIngredient extends Ingredient{
  checked?:boolean,
  volume?: number,
  unit?: string,
}

export interface CocktailRequest {
  username: string;
  cocktailName: string;
  ingredients: CocktailIngredient[];
  proof: number;
  glass: string;
  method: string;
  garnish: string;
  image: File;
  description: string;
}

function AddCocktailSwiper({glass,method,ingredients}:{glass:string[],method:string[],ingredients:Ingredient[]}) {
    const swiperRef = useRef<SwiperCore>();
    const [cocktailRequest, setCocktailRequest] = useState<CocktailRequest>({
      username: 'kimadonghyon4574@gmail.com',
      cocktailName: '',
      ingredients: [],
      proof: 0,
      glass: '',
      method: '',
      garnish: '',
      image:new File([], ''),
      description: '',
    });

    console.log(cocktailRequest.image !== null)

    return (
      <div>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Scrollbar]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          scrollbar={{
            el: ".swiper-scrollbar",
            draggable: true,
          }}
        >
          <SwiperSlide>
            <CocktailInformation
              glass={glass}
              method={method}
              cocktailRequest={cocktailRequest}
              setCocktailRequest={setCocktailRequest}
            />
          </SwiperSlide>

          <SwiperSlide>
            <CocktailIngredient
              ingredients={ingredients}
              cocktailRequest={cocktailRequest}
              setCocktailRequest={setCocktailRequest}
            />
          </SwiperSlide>

          <SwiperSlide>
            <CocktailImage
              cocktailRequest={cocktailRequest}
              setCocktailRequest={setCocktailRequest}
            />
          </SwiperSlide>

          <SwiperSlide>
            <FinalCocktail cocktailRequest={cocktailRequest} setCocktailRequest={setCocktailRequest}/>
          </SwiperSlide>  
        </Swiper>
        <div className="flex justify-between mt-4">
          <div className="swiper-button-prev text-white cursor-pointer"></div>
          <div className="swiper-button-next text-white cursor-pointer"></div>
        </div>

        <div className="swiper-scrollbar"></div>
      </div>
    );
}

export default AddCocktailSwiper
