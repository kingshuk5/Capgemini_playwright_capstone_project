import { APIRequestContext, request } from "@playwright/test";

export class BaseAPi{
    public requestContext!:APIRequestContext;

    async init(){
        this.requestContext=await request.newContext({
            baseURL:"https://parabank.parasoft.com",
        });
    }

    async dispose(){
        await this.requestContext.dispose()
    }

    async getFunc(url:string){
        return await this.requestContext.get(url);
    }

}