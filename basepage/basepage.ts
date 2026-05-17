import { Page } from "@playwright/test";

export default class BasePage{
    public page:Page;

    constructor (page:Page){
        this.page=page;
        console.log("Page Started");     
    }

    async closePage(){
        console.log("Page Closed");   
        // this.page.close();
  
    }

}