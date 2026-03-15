export const isProduction = process.env.NODE_ENV === "production";

export const isDebugUiEnabled =
    !isProduction || process.env.NEXT_PUBLIC_DEBUG_UI === "true";

export const isDebugLogEnabled =
    !isProduction || process.env.NEXT_PUBLIC_DEBUG_LOGS === "true";
