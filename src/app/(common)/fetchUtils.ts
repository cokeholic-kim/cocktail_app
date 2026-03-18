import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";
import { logWarn } from "./safeLogger";

export type FetchResult<T> = {
    ok: boolean;
    data: T;
    status: number;
    error: string | null;
};

export async function fetchWithCookie<T>(
    url: string,
    cookieName: string = AUTH_COOKIE_NAME,
    options?: { fallback: T },
) {
    const authToken = (await cookies()).get(cookieName);
    const fallback = options?.fallback;
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (authToken?.value) {
        const safeCookieName = /^[A-Za-z0-9_-]{1,64}$/.test(cookieName) ? cookieName : AUTH_COOKIE_NAME;
        headers["Cookie"] = `${safeCookieName}=${authToken.value}`;
    }

    try {
        const response = await fetch(url, {
            headers,
        });

        if (!response.ok) {
            return {
                ok: false,
                data: fallback as T,
                status: response.status,
                error: `HTTP error! status: ${response.status}`,
            };
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return {
                ok: false,
                data: fallback as T,
                status: response.status,
                error: "Unexpected response content type",
            };
        }

        const text = await response.text();
        if (!text.trim()) {
            return {
                ok: false,
                data: fallback as T,
                status: response.status,
                error: "Empty response body",
            };
        }

        try {
            const data = JSON.parse(text) as T;
            return { ok: true, data, status: response.status, error: null };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Invalid JSON response";
            logWarn("Fetch response json parse failed:", message);
            return {
                ok: false,
                data: fallback as T,
                status: response.status,
                error: "Invalid response format",
            };
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown fetch error";
        logWarn("Fetch failed:", message);
        return {
            ok: false,
            data: fallback as T,
            status: 0,
            error: message,
        };
    }
}

