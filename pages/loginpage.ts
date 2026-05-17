import { Page } from "@playwright/test";

export default class LoginPage{

    constructor (public page:Page){

    }
    
    async navigateTo(url:string){
        await this.page.goto(url);
    }

    async loginFUnction(username:string,password:string){
        await this.page.locator('input[name="username"]').fill(username);
        await this.page.locator("//input[@name='password']").fill(password);
        await this.page.getByRole('button', { name: 'Log In' }).click();
    }

}