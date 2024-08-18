import Image from "next/image"
import { banner } from "./page"

interface BannerSlideProps{
  banner:banner
}

function BannerSlide({banner}:BannerSlideProps) {
  return (
    <div className="w-full h-96">
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
          <Image
            src={banner.imagePath}
            alt={banner.title}
            width={400}
            height={300}
            className="rounded-t-lg w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerSlide
