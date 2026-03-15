import { describe, expect, it } from "vitest";
import {
    sanitizeText,
    encodeRouteSegment,
    isValidListItem,
} from "../../src/app/(common)/securityValidation";

describe("securityValidation", () => {
    it("sanitizeText는 제어문자 제거 후 trim 합니다", () => {
        const input = "\u0000test\tvalue\n";
        expect(sanitizeText(input)).toBe("testvalue");
    });

    it("encodeRouteSegment는 길이 제한 후 인코딩합니다", () => {
        const input = "  abcdefghijklmnopqrstuvwxyz  ";
        expect(encodeRouteSegment(input, 20)).toBe(encodeURIComponent("abcdefghijklmnopqrst"));
    });

    it("isValidListItem은 허용 문자 조건을 검증합니다", () => {
        expect(isValidListItem("margarita")).toBe(true);
        expect(isValidListItem("margarita!!")).toBe(false);
        expect(isValidListItem("")).toBe(false);
        expect(isValidListItem("a".repeat(121))).toBe(false);
    });
});
