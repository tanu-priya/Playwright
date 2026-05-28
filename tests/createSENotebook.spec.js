import {test, expect} from '@playwright/test';
import { apiHelper} from '../utils/apiHelper.js';
import { DashboardPage } from '../pages/DashboardPage.js'; 
import { dataUtil } from '../utils/dataUtil.js';
import {StrategyExplorerPage } from '../pages/StrategyExplorerPage.js';
import dynamicData from '../utils/dynamicData.json';



test("@smoke Create SE Notebook", async({page,request})=>{
    const notebookName = new dataUtil().SENotebookName();
    const se = new StrategyExplorerPage(page);
    const api = new apiHelper(page, request);
    await api.login(dynamicData.validCred[0].username, dynamicData.validCred[0].password);
    const dashboardPage = new DashboardPage(page,expect);
    await dashboardPage.createSENotebook(notebookName);
    expect(page.locator('.nb-page-header').getByText(notebookName)).toBeTruthy(); 
    //await dashboardPage.openSENotebook(0);
    await se.inputContext("Big data analytics in healthcare") ;
    console.log(await se.sideNavResearchSetUp.isChecked()); // true/false
    await expect(se.sideNavResearchSetUp).toBeChecked();})
     