import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "Authorization";

export async function fetchWithCookie(url: string, cookieName: string = AUTH_COOKIE_NAME) {
    const authToken = (await cookies()).get(cookieName);
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (authToken?.value) {
        headers['Cookie'] = `${cookieName}=${authToken.value}`;
    }

    try {
        const response = await fetch(url, {
            headers,
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch failed:", error);
        return { body: [] };
    }
}
