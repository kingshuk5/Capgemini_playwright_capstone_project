import { Page } from "@playwright/test";

export default class FundTranserPage{
    constructor(public page:Page){

    }

    async enterAmount(amount:string){
        await this.page.locator("//input[@id='amount']").fill(amount);
    }

    async selectFromAccount(account:string){
        await this.page.locator("//select[@id='fromAccountId']").selectOption(account);
    }

    async selectToAccount(account:string){
        await this.page.locator("//select[@id='toAccountId']").selectOption(account);
    }

    async clickTransferButton(){
        await this.page.locator("//input[@value='Transfer']").click();
    }

    async getConfirmationAmountNumberOnly(){
        const locator = this.page.locator("//span[@id='amountResult']");
        await locator.waitFor({ state: 'visible' }); 
        const amountText = await locator.textContent();
        if (!amountText) {
            throw new Error('Confirmation from account is null or empty');
        }
        const amountValue = parseFloat(
            amountText.replace(/[$,]/g, '').trim()
        );
        const finalAmmount:string=String(amountValue);
        return finalAmmount;
    }

    async getConfirmationAmountWithDecimel(){
        const locator = this.page.locator("//span[@id='amountResult']");
        await locator.waitFor({ state: 'visible' }); 
        const amountText = await locator.textContent();
        if (!amountText) {
            throw new Error('Confirmation amount is null or empty');
        }
        const amountValue = amountText.replace(/[$,]/g,'').trim();
        return amountValue;
    }

    async getConfirmationFromAccount(){
        const locator = this.page.locator("//span[@id='fromAccountIdResult']");
        await locator.waitFor({ state: 'visible' }); 
        const account = await locator.textContent();
        if (!account) {
            throw new Error('Confirmation from account is null or empty');
        }
        return account;
    }

    async getConfirmationToAccount(){
        const locator = this.page.locator("//span[@id='toAccountIdResult']");
        await locator.waitFor({ state: 'visible' }); 
        const account = await locator.textContent();
        if (!account) {
            throw new Error('Confirmation To account is null');
        }
        return account;
    }

    async getTransferCompleteMessageHeading(){
        const locator = this.page.locator("//h1[text()='Transfer Complete!']");
        await locator.waitFor({ state: 'visible' }); 
        const message=await locator.textContent();
        if (!message) {
            throw new Error('Confirmation msg heading is null');
        }
        return message;
    }

    async getTransferErrorMessageHeading(){
        const locator = this.page.locator("//div[@id='showError']/h1");
        await locator.waitFor({ state: 'visible' }); 
        const message=await locator.textContent();
        if (!message) {
            throw new Error('Error msg heading is null');
        }
        return message;
    }

    async getTransferErrorMessage(){
        const locator = this.page.locator("//div[@id='showError']/p");
        await locator.waitFor({ state: 'visible' }); 
        const message=await locator.textContent();
        if (!message) {
            throw new Error('Error msg heading is null');
        }
        return message;
    }



}

