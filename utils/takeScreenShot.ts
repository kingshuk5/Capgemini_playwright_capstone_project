import { Page ,TestInfo} from "@playwright/test";


export default class takeScreenshots{
    constructor(public page:Page){

    }
    async takeScreenshot(image:string){
        await this.page.screenshot({path: './Screenshots/'+image+'.png', fullPage:true});
    }
    async takeAndAttachScreenshot(testInfo:TestInfo,image:string){
        await this.page.screenshot({path: './Screenshots/'+image+'.png', fullPage:true});
        await testInfo.attach('saved Screenshot',{
        path:'./Screenshots/Image1.png',
        contentType: 'image/png',
    })
    }
}