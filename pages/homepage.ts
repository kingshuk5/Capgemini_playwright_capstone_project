import { Page } from "@playwright/test";

export default class Homepage{

    constructor(public page:Page){

    }

    async clickTransferFunds(){
        await this.page.getByRole('link', { name: 'Transfer Funds' }).click();
    }
    
    async clickOverView(){
        await this.page.getByRole('link', { name: 'Accounts Overview' }).click();
    }

    async clickOpenNewAccount(){
        await this.page.getByRole('link', { name: 'Open New Account' }).click();
    }

    async getTransferErrorMessageHeading(){
        const locator = this.page.locator("//div[@id='rightPanel']/h1");
        await locator.waitFor({ state: 'visible' }); 
        const message=await locator.textContent();
        if (!message) {
            throw new Error('Error msg heading is null');
        }
        return message;
    }

    async getTransferErrorMessage(){
        const locator = this.page.locator("//div[@id='rightPanel']/p");
        await locator.waitFor({ state: 'visible' }); 
        const message=await locator.textContent();
        if (!message) {
            throw new Error('Error msg heading is null');
        }
        return message;
    }

    async getLoginMessage(){
        const locator = this.page.locator("//div[@id='leftPanel']/h2");
        await locator.waitFor({ state: 'visible' }); 
        const message=await locator.textContent();
        if (!message) {
            throw new Error('Error msg heading is null');
        }
        return message;
    }


}