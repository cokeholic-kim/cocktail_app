import Image from "next/image";
import Link from "next/link";

import type { HomeBanner } from "@/app/design-lab/page";
import { uiTokenStyles } from "@/app/(common)/components/uiTokens";

interface BannerSlideProps {
    banner: HomeBanner;
}

export default function BannerSlide({ banner }: BannerSlideProps) {
    const imageAlt = banner.title || "Cocktail banner";

    return (
        <Link href={banner.src} className="group block">
            <div className="h-96 w-full">
                <div className="relative h-full w-full">
                    <div className={uiTokenStyles.card.imageFrame}>
                        <Image
                            src={banner.imagePath}
                            alt={imageAlt}
                            width={400}
                            height={300}
                            className="h-full w-full rounded-t-lg object-cover"
                            sizes="(min-width: 768px) 100vw, 100vw"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}
