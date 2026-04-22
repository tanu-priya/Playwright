class StrategyExplorerPage {
    constructor(page) {
        this.page = page;    
        this.context = page.locator('input[name="context"]');
        this.sideNavResearchSetUp = page.locator('li', {has: page.getByText('1 - Research Set Up')})
                                        .locator('input[type="checkbox"]');
    


    }

    async inputContext(context){
        await this.context.fill(context);

    }


}
export { StrategyExplorerPage };