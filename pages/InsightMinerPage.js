class InsightMinerPage {

    constructor(page) {
        this.page = page;
        this.uploadFilesButton = page.getByRole('button', { name: 'Upload files' });
        this.AddWebLinksButton = page.getByRole('button', { name: 'Add web links' });
        this.importFromProjectButton = page.getByRole('button', { name: 'Import from other projects' });
        this.inputFile = page.locator('input[type="file"]');
        this.materialDistributionRadio = page.getByText('External use', { exact: true });
        this.sourceOwnershipRadio = page.getByText('Yes: either your organization');
        this.uploadButton = page.getByRole('button', { name: 'Upload', exact: true });
        this.aiProcessingText = page.getByText('AI-Processing...');
        this.uploadedSuccessText = page.getByText("have been successfully uploaded");
        this.paragraphText = page.locator('.ic-paragraph.text-sm');
    }


    async uploadFile() {
        await this.uploadFilesButton.click();
        await this.inputFile.setInputFiles('./test-data/files/Predictive-maintenance.pdf');
        await this.materialDistributionRadio.click();
        await this.sourceOwnershipRadio.click();
        await this.uploadButton.click();
    }

    async verifyFileUploaded(expect, existingFiles) {
        await expect(this.uploadedSuccessText).toBeVisible({ timeout: 40000 });
        await expect(this.aiProcessingText).toBeVisible();
        /*await expect(this.aiProcessingText).toBeHidden({ timeout: 300000 });
        let count = await this.paragraphText.count();
        await expect(count).toBeGreaterThan(existingFiles);*/
    }
}

export { InsightMinerPage };