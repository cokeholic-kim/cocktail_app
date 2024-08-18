"use client"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from "swiper"
import { useRef } from 'react';
import { Navigation, Scrollbar } from 'swiper/modules';
import BannerSlide from "./BannerSlide";
import { banner } from "./page";

interface MainBannerProps {
  banners : banner[]
}
function MainBanner({banners}:MainBannerProps) {
    const swiperRef = useRef<SwiperCore>();
  return (
    <div className=" relative">
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
          {banners.map((banner:banner,index:number)=> {
            return (
              <SwiperSlide key={index}>
                <BannerSlide banner={banner}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="flex justify-between mt-4">
          <div className="swiper-button-prev text-white cursor-pointer"></div>
          <div className="swiper-button-next text-white cursor-pointer"></div>
        </div>

    </div>
  );
}

export default MainBanner
