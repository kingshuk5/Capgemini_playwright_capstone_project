import { APIResponse, Page ,expect} from "@playwright/test";

export default class assertClass{
    constructor(public page:Page){

    }

    async assertAmmount(EnteredAmount:string,displayedAmount:string){
        await expect(EnteredAmount).toEqual(displayedAmount)
    }
    async assertAccount(EnteredAccount:string,displayedAccount:string){
        await expect(EnteredAccount).toEqual(displayedAccount)
    }
    async assertMatch(Entered:string,displayed:string){
        await expect(Entered).toBe(displayed)
    }

    static verifyStatusCOde(response:APIResponse,code :number){
        expect(response.status()).toBe(code);
    }

    static assertApiData(Entered:string,displayed:string){
        expect(Entered).toBe(displayed)
    }
    
}