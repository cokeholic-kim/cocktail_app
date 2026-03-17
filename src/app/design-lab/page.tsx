import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isDebugUiEnabled } from "@/app/(common)/environment";
import DesignLabClient from "./DesignLabClient";

export const metadata: Metadata = {
    title: "Design Lab",
    description:
        "디자인 랩은 API 데이터가 없어도 컴포넌트의 기본/로딩/에러/빈 상태를 UI로 확인하고 검증하는 내부 페이지입니다.",
};

export default function DesignLabPage() {
    if (!isDebugUiEnabled) {
        notFound();
    }

    return <DesignLabClient />;
}
