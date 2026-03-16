"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import { useRef } from "react";
import { Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import type { HomeBanner } from "@/app/design-lab/fixtures";
import BannerSlide from "./BannerSlide";

interface MainBannerProps {
    banners: HomeBanner[];
}

export default function MainBanner({ banners }: MainBannerProps) {
    const swiperRef = useRef<SwiperCore | null>(null);

    return (
        <div className="relative">
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                modules={[Navigation, Scrollbar]}
                spaceBetween={16}
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
                {banners.map((banner) => (
                    <SwiperSlide key={banner.order}>
                        <BannerSlide banner={banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mt-4 flex justify-between">
                <button
                    type="button"
                    aria-label="이전 배너 보기"
                    className="swiper-button-prev cursor-pointer text-white"
                />
                <button
                    type="button"
                    aria-label="다음 배너 보기"
                    className="swiper-button-next cursor-pointer text-white"
                />
            </div>
        </div>
    );
}
