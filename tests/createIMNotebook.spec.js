import {test,expect} from '@playwright/test';
import { apiHelper} from '../utils/apiHelper.js';
import { DashboardPage } from '../pages/DashboardPage.js'; 
import { dataUtil } from '../utils/dataUtil.js';
import { InsightMinerPage } from '../pages/InsightMinerPage.js';
import dynamicData from '../utils/dynamicData.json';




test("@smoke Create IM Notebook", async({page,request})=>{ 
    const notebookName = new dataUtil().IMNotebookName();
    const im = new InsightMinerPage(page);
    const api = new apiHelper(page, request);
    //If using auth setup, comment below line and uncomment page.goto () and line in playwright.config.js for storage state
    await api.login(dynamicData.validCred[0].username, dynamicData.validCred[0].password);
    //await page.goto("/");
    
    const dashboardPage = new DashboardPage(page,expect);
    //await dashboardPage.createIMNotebook(notebookName);
    //expect(page.locator('.nb-page-header').getByText(notebookName)).toBeTruthy(); 
    await dashboardPage.openIMNotebook(0);
    await expect(page.getByRole('heading', { name: "Source Materials" })).toBeVisible({timeout: 10000});
    let existingFiles = await im.paragraphText.count();
    await im.uploadFile();
    await im.verifyFileUploaded(expect, existingFiles);
   
})
