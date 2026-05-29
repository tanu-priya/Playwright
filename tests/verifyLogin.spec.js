import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import dynamicData from '../utils/dynamicData.json';
import { getValidCredentials } from '../utils/credentials.js';

test.use({ storageState: { cookies: [], origins: [] } });
test.describe("Login Tests ", () => {
    test.describe.configure({ mode: 'parallel' });
    const validCred = getValidCredentials();
    var loginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/');
    });

    test("verify Login when enter invalid credentials", async ({ page }) => {
        await loginPage.loginWithInvalidCredentials(dynamicData.invalidCred[0].invalidUsername, dynamicData.invalidCred[0].invalidPassword);
        expect(await loginPage.loginErrorMessage.textContent()).toBe("Wrong email or password");
    })
    for (const data of validCred) {
    test(`verify Login when enter valid credentials ${data.username}`, async ({ page }) => {
        const dashboardPage = await loginPage.login(data.username, data.password);
        await dashboardPage.finishButtonClick();
        expect(await dashboardPage.yourWorkHeader.isVisible()).toBeTruthy();
    });
}
})

