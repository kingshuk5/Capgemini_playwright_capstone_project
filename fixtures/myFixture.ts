import { test as sampleTest} from "@playwright/test";

export const myTest=sampleTest.extend<{data:{url:string}}>({
    data:async({},use)=>{
        await use({url:"https://parabank.parasoft.com"})
    }
})