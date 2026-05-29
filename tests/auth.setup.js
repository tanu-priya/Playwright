import {test as setup} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { getValidCredentials } from '../utils/credentials.js';


setup('Login before each test', async ({ page}) => {
    const env = process.env.TEST_ENV || 'dev';  
    const [credentials] = getValidCredentials();
    const loginPage = new LoginPage(page);
    await page.goto("/");
    const dashboardPage = await loginPage.login(credentials.username, credentials.password);
    await dashboardPage.finishButtonClick();
    await dashboardPage.yourWorkHeader.isVisible();
    await page.context().storageState({ path: `playwright/${env}-auth.json` });
});