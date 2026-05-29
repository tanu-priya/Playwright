import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import dynamicData from '../utils/dynamicData.json';



test.use({ storageState: { cookies: [], origins: [] } });
test('open two context and login', async ({browser}) => {
   
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    const  loginPage1 = new LoginPage(page1);
    await page1.goto('/');

    const dashboardPage = await loginPage1.login(dynamicData.validCred[0].username, dynamicData.validCred[0].password);
    await dashboardPage.finishButtonClick();
    expect(await dashboardPage.yourWorkHeader.isVisible()).toBeTruthy();
    const  loginPage2 = new LoginPage(page2);
    await page2.goto('/');
    expect(await loginPage2.emailInput.isVisible()).toBeTruthy();

})