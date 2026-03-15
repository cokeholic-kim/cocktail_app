import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchWithCookie } from "../../src/app/(common)/fetchUtils";

type MockResponse = {
    ok: boolean;
    status: number;
    text: () => Promise<string>;
};

const fallback = { body: [] as string[] };
const mockFetch = vi.fn<[], Promise<MockResponse>>();

let getCookie: ReturnType<typeof vi.fn>;

vi.mock("next/headers", () => ({
    cookies: vi.fn(async () => ({
        get: getCookie,
    })),
}));

describe("fetchWithCookie", () => {
    beforeEach(() => {
        getCookie = vi.fn().mockReturnValue({ value: "token-123" });
        mockFetch.mockReset();
        vi.stubGlobal("fetch", mockFetch);
    });

    it("토큰이 있으면 Cookie 헤더를 첨부해 성공 응답을 처리합니다", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            text: async () => JSON.stringify(["cocktail"]),
        });

        const result = await fetchWithCookie<string[]>("https://api.example.com/cocktails", "Authorization", {
            fallback,
        });

        expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/cocktails", {
            headers: {
                "Content-Type": "application/json",
                Cookie: "Authorization=token-123",
            },
        });
        expect(result.ok).toBe(true);
        expect(result.data).toEqual(["cocktail"]);
        expect(result.error).toBeNull();
    });

    it("HTTP 에러 응답 시 폴백을 반환합니다", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 500,
            text: async () => "server down",
        });

        const result = await fetchWithCookie<string[]>("https://api.example.com/cocktails", "Authorization", {
            fallback,
        });

        expect(result.ok).toBe(false);
        expect(result.status).toBe(500);
        expect(result.data).toEqual(fallback);
        expect(result.error).toContain("HTTP error! status: 500");
    });

    it("빈 바디는 빈 응답 에러로 처리하고 폴백을 반환합니다", async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            text: async () => "",
        });

        const result = await fetchWithCookie<string[]>("https://api.example.com/cocktails", "Authorization", {
            fallback,
        });

        expect(result.ok).toBe(false);
        expect(result.data).toEqual(fallback);
        expect(result.error).toBe("Empty response body");
    });

    it("네트워크 에러는 status 0과 에러 메시지로 폴백을 반환합니다", async () => {
        mockFetch.mockRejectedValue(new Error("network down"));

        const result = await fetchWithCookie<string[]>("https://api.example.com/cocktails", "Authorization", {
            fallback,
        });

        expect(result.ok).toBe(false);
        expect(result.status).toBe(0);
        expect(result.data).toEqual(fallback);
        expect(result.error).toBe("network down");
    });

    it("쿠키가 없으면 Cookie 헤더를 추가하지 않습니다", async () => {
        getCookie = vi.fn().mockReturnValue(undefined);
        mockFetch.mockResolvedValue({
            ok: true,
            status: 200,
            text: async () => JSON.stringify(["cocktail"]),
        });

        await fetchWithCookie<string[]>("https://api.example.com/cocktails");

        expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/cocktails", {
            headers: {
                "Content-Type": "application/json",
            },
        });
    });
});
