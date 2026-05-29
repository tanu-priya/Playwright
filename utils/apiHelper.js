import { DashboardPage } from '../pages/DashboardPage.js';
import envConfig from '../config/envLoader.js';


class apiHelper {

    constructor(page, request) {
        this.request = request;
        this.page = page;
    }

    async login(email, password) {
        const response = await this.request.post(envConfig.apiBaseURL + "db/v0.3/login", {
            data: { email, password }
        });
        const result = await response.json();
        console.log("API Login successful, token received:", result);
        await this.page.addInitScript(value => {
            window.localStorage.setItem('user-token', value);
        }, result.accessToken);
        await this.page.goto("/");
        await this.page.waitForLoadState('networkidle');
        const dashboardPage = new DashboardPage(this.page);
        await dashboardPage.finishButtonClick();
    }
}

export { apiHelper };