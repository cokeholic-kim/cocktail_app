import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/app/(common)/constants";

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
        headers["Cookie"] = `${cookieName}=${authToken.value}`;
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

        const text = await response.text();
        if (!text.trim()) {
            return {
                ok: false,
                data: fallback as T,
                status: response.status,
                error: "Empty response body",
            };
        }

        const data = JSON.parse(text) as T;
        return { ok: true, data, status: response.status, error: null };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown fetch error";
        console.error("Fetch failed:", error);
        return {
            ok: false,
            data: fallback as T,
            status: 0,
            error: message,
        };
    }
}

