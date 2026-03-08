import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "Authorization";

export type FetchResult<T> = {
  ok: boolean;
  data: T;
  status: number;
  error: string | null;
};

export async function fetchWithCookie<T>(url: string, cookieName: string = AUTH_COOKIE_NAME, options?: { fallback: T }) {
  const authToken = (await cookies()).get(cookieName);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken?.value) {
    headers["Cookie"] = `${cookieName}=${authToken.value}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as T;
    return { ok: true, data, status: response.status, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "네트워크 오류";
    console.error("Fetch failed:", error);
    return {
      ok: false,
      data: options?.fallback as T,
      status: 0,
      error: message,
    };
  }
}
