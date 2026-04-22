import { expect } from "playwright/test";

class DashboardPage {
    constructor(page, expect) {
        this.page = page;
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.createIMNotebookButton = page.getByRole('button', { name: 'New Insight Miner Notebook' });
        this.inputNotebookName = page.locator('.ic-input.input-gray.input-large').locator('input');
        this.createButton = page.getByRole('button', { name: 'Create', exact: true });
        this.yourWorkHeader = page.getByText("Your Work");
        this.createSENotebookButton = page.getByRole('button', { name: 'New Strategy Explorer Notebook' });

    }
    async finishButtonClick() {
        await this.finishButton.waitFor({ state: 'visible' });
        await this.finishButton.click();
    }

    async createIMNotebook(notebookName) {
        await this.createNotebookButton.click();
        await this.inputNotebookName.fill(notebookName);
        await this.createButton.click();
    }

    async openIMNotebook(elementNo) {
        await this.page.locator('div.ic-card')
            .filter({ has: this.page.getByRole('heading', { name: 'Insight Miner' }) })
            .locator('ul > li > div:first-child > a').nth(elementNo).click();
        await this.page.waitForLoadState('networkidle');
    }

    async openSENotebook(elementNo) {
        await this.page.locator('div.ic-card')
            .filter({ has: this.page.getByRole('heading', { name: 'Strategy Explorer' }) })
            .locator('ul > li > div:first-child > a').nth(elementNo).click();
        await this.page.waitForLoadState('networkidle');
    } 

    async createSENotebook(notebookName) {
        await this.createSENotebookButton.click();
        await this.inputNotebookName.fill(notebookName);
        await this.createButton.click();

    }
}

export { DashboardPage };