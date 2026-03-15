import { expect, test } from '@playwright/test';

const SAMPLE_COCKTAIL = "Sample Cocktail";
const SAMPLE_INGREDIENT = "Sample Ingredient";

test.describe('핵심 기능 플로우', () => {
    test('홈에서 칵테일 상세로 이동', async ({ page }) => {
        await page.goto('/');

        const readMoreLink = page.getByRole('link', { name: /Read more/i }).first();
        await expect(page.getByText(SAMPLE_COCKTAIL)).toBeVisible({ timeout: 30000 });
        await expect(readMoreLink).toBeVisible({ timeout: 30000 });
        await readMoreLink.click();

        await expect(page).toHaveURL(/\/cocktails\//);
        await expect(page.getByRole('heading', { name: new RegExp(SAMPLE_COCKTAIL, 'i') })).toBeVisible();
        await expect(page.getByRole('heading', { name: /^Ingredients$/i })).toBeVisible();
    });

    test('재료 검색 필터 동작 확인', async ({ page }) => {
        await page.goto('/ingredients');
        await expect(page.getByText(/loading/i)).toBeHidden({ timeout: 30000 });

        const readMoreLinks = page.getByRole('link', { name: /Read more/i });
        await expect(page.getByText(SAMPLE_INGREDIENT)).toBeVisible({ timeout: 30000 });

        const searchInput = page.locator('form[role="search"] input[type="text"]');
        await expect(searchInput).toBeVisible({ timeout: 30000 });
        await searchInput.fill('@@@not-existing@@@');

        await expect(searchInput).toHaveValue('@@@not-existing@@@');
        await expect(page.getByText(SAMPLE_INGREDIENT)).toBeVisible();
    });

    test('칵테일 검색 결과 필터 동작 확인', async ({ page }) => {
        await page.goto('/cocktails');
        await expect(page.getByText(/loading/i)).toBeHidden({ timeout: 30000 });
        await expect(page.getByText(SAMPLE_COCKTAIL)).toBeVisible({ timeout: 30000 });

        const searchInput = page.locator('form[role="search"] input[type="text"]');
        await expect(searchInput).toBeVisible({ timeout: 30000 });
        await searchInput.fill('@@@not-existing@@@');

        await expect(searchInput).toHaveValue('@@@not-existing@@@');
        await expect(page.getByRole('link', { name: /Read more/i }).first()).toBeVisible();
    });

    test('회원가입 폼 유효성 검사 플로우', async ({ page }) => {
        await page.goto('/join');

        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');
        const passwordInput = page.locator('input[name="password"]');
        const submitButton = page.locator('button[type="submit"]');

        await expect(submitButton).toBeDisabled();

        await nameInput.fill('sample-user');
        await emailInput.fill('not-an-email');
        await passwordInput.fill('Abcdef1!');
        await expect(submitButton).toBeDisabled();

        await emailInput.fill('user@example.com');
        await expect(submitButton).toBeDisabled();
    });

    test('내재료 선택 후 추천 페이지 이동', async ({ page }) => {
        await page.goto('/myingredients/fitCocktail?checkedIngredients=%5B%22Sample%20Ingredient%22%5D');

        await expect(page).toHaveURL(/\/myingredients\/fitCocktail/);
        await expect(page).toHaveURL(/checkedIngredients=%5B%22Sample%20Ingredient%22%5D/);
        await expect(page.locator('main')).toBeVisible();
    });

    test('로그인 화면 기본 입력 처리', async ({ page }) => {
        await page.goto('/login');

        const usernameInput = page.getByPlaceholder('Email');
        const passwordInput = page.getByPlaceholder('Password');
        const loginButton = page.getByRole('button', { name: 'Log In' });

        await expect(usernameInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
        await expect(loginButton).toBeVisible();

        await usernameInput.fill('user@example.com');
        await passwordInput.fill('Passw0rd!');
    });
});
