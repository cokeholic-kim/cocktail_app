import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isDebugUiEnabled } from "@/app/(common)/environment";
import DesignLabClient from "./DesignLabClient";

export const metadata: Metadata = {
    title: "Design Lab",
    description: "Design Lab은 컴포넌트 검증 및 UI 실험을 위한 개발 전용 페이지입니다.",
};

export default function DesignLabPage() {
    if (!isDebugUiEnabled) {
        notFound();
    }

    return <DesignLabClient />;
}
