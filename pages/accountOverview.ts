import { Page } from "@playwright/test";

export default class accountOverviewPage{
    constructor(public page:Page){

    }

    async getAccountBalance(accountNumber: string): Promise<string> {
        const row = this.page.locator(
            `//table[@id='accountTable']//tr[td/a[text()='${accountNumber}']]`
        );

        const balanceText = await row
            .locator('td:nth-child(2)')
            .textContent();

        const balance=balanceText!.replace(/[$,]/g, '').trim();
        return balance;

    }

}