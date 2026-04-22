import { DashboardPage } from '../pages/DashboardPage.js';
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder("Your email...");
        this.passwordInput = page.getByPlaceholder("Your password ...");
        this.loginButton = page.getByRole("button", { name: "Log In" });
        this.modal = page.locator(".modal-header-container");
        this.loginErrorMessage = page.locator('.ic-alert.ic-alert-error').locator('p');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
        const dashboardPage = new DashboardPage(this.page);
        return dashboardPage;
    }
    async loginWithInvalidCredentials(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');

    }
}

export { LoginPage };