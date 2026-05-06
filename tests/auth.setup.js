import {test as setup} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import dynamicData from '../utils/dynamicData.json';


setup('Login before each test', async ({ page}) => {
    const env = process.env.TEST_ENV || 'dev';  
    const loginPage = new LoginPage(page);
    await page.goto("/");
    const dashboardPage =  await loginPage.login(dynamicData.validCred[0].username, dynamicData.validCred[0].password);
    await dashboardPage.finishButtonClick();
    await dashboardPage.yourWorkHeader.isVisible();
    await page.context().storageState({ path: `playwright/${env}-auth.json` });
});