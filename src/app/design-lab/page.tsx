import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isDebugUiEnabled } from "@/app/(common)/environment";
import DesignLabClient from "./DesignLabClient";

export interface HomeBanner {
    imagePath: string;
    title: string;
    src: string;
    order: number;
}

export const metadata: Metadata = {
    title: "Design Lab",
    description:
        "Design Lab는 백엔드 없이도 UI 컴포넌트 상태를 미리 확인하고, 검색·빈 응답·에러 케이스를 빠르게 검증할 수 있는 랩 페이지입니다.",
};

export default function DesignLabPage() {
    if (!isDebugUiEnabled) {
        notFound();
    }

    return <DesignLabClient />;
}
