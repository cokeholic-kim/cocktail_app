import { expect, test } from '@playwright/test';

const CRASH_HINTS = ['application error', 'hydration', 'minified React error'];

const criticalPaths = [
    '/',
    '/cocktails',
    '/ingredients',
    '/myingredients',
    '/login',
    '/join',
];

test.describe('핵심 경로 접근성 스모크', () => {
    for (const path of criticalPaths) {
        test(`기본 경로 ${path} 로드`, async ({ page }) => {
            const response = await page.goto(path, { waitUntil: 'domcontentloaded' });

            const status = response?.status() ?? 200;
            expect([200, 204, 301, 302, 307, 308]).toContain(status);

            await expect(page.locator('body')).toBeVisible();

            const text = (await page.textContent('body')) ?? '';
            const lowered = text.toLowerCase();

            for (const hint of CRASH_HINTS) {
                expect(lowered.includes(hint)).toBeFalsy();
            }

            await page.screenshot({ path: `test-results/${path.replaceAll('/', '_') || 'home'}-smoke.png` });
        });
    }
});
