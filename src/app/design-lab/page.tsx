import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isDebugUiEnabled } from "@/app/(common)/environment";
import DesignLabClient from "./DesignLabClient";

export const metadata: Metadata = {
    title: "Design Lab",
    description: "디자인 랩은 API 없이도 UI 컴포넌트를 미리 확인할 수 있는 테스트 페이지입니다.",
};

export default function DesignLabPage() {
    if (!isDebugUiEnabled) {
        notFound();
    }

    return <DesignLabClient />;
}
