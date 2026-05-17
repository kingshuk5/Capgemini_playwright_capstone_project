import { BaseAPi } from "../../basepage/baseApi";
import { myTest } from "../../fixtures/myFixture";
import Homepage from "../../pages/homepage";
import LoginPage from "../../pages/loginpage";
import FundTranserPage from "../../pages/fundTransferPage";
import accountOverviewPage from "../../pages/accountOverview";
import e2eTcFt20TestData from '../../test-data/e2e-tcFt20.json';
import { XMLParser } from "fast-xml-parser";
import logindata from '../../test-data/ui-loginDetails-test-data.json';
import { request } from "@playwright/test";
import assertClass from "../../utils/assert";
import e2eTcFt21TestData from '../../test-data/e2e-tcFt21.json';


myTest.describe('e2e test cases',()=>{

    const parser =new XMLParser();

    const confMsgHead="Transfer Complete!"

    const errorHeading=`
                Error!
            `
    const errorMessage=`
                An internal error has occurred and has been logged.
            `
    let baseApi:BaseAPi;

    myTest.beforeEach('before Each test cases',async ({page,data:fixtureData})=>{
        const loginPage=new LoginPage(page);
        await loginPage.navigateTo(fixtureData.url);
        await loginPage.loginFUnction(logindata.loginUsername,logindata.password);
        baseApi=new BaseAPi();
        await baseApi.init();
    })

    myTest.afterEach('after each',async({page})=>{
        await page.close();
        await baseApi.dispose();
    })

for (const data of e2eTcFt20TestData) {
    myTest("TC-FT-20",async({page,request})=>{
        const home = new Homepage(page);
        const fund= new FundTranserPage(page);
        const assert= new assertClass(page);

        const fromAccntBefore= await baseApi.getFunc(`/parabank/services/bank/accounts/${data.account1}`);
        const toAccntBefore= await baseApi.getFunc(`/parabank/services/bank/accounts/${data.account2}`);

        const fromObj= parser.parse(await fromAccntBefore.text());
        const toObj= parser.parse(await toAccntBefore.text());

        const fromBalBefore= parseFloat(fromObj.account.balance);
        const toBalBefore= parseFloat(toObj.account.balance);

        await home.clickTransferFunds();
        await fund.enterAmount(data.amount);
        await fund.selectFromAccount(data.account1);
        await fund.selectToAccount(data.account2);
        await fund.clickTransferButton();

        const confMsgHeading = await fund.getTransferCompleteMessageHeading();
        await assert.assertMatch(confMsgHeading,confMsgHead);

        
        const fromAccntAfter= (await baseApi.getFunc(`/parabank/services/bank/accounts/${data.account1}`));
        const toAccntAfter= (await baseApi.getFunc(`/parabank/services/bank/accounts/${data.account2}`));

        const fromObj2= parser.parse(await fromAccntAfter.text());
        const toObj2= parser.parse(await toAccntAfter.text());

        const fromBalAFter= parseFloat(fromObj2.account.balance);
        const toBalAFter= parseFloat(toObj2.account.balance);

        const fromDiff=String(fromBalBefore-fromBalAFter);
        const toDiff=String(toBalAFter-toBalBefore);

        await assert.assertMatch(fromDiff,data.amount);
        await assert.assertMatch(toDiff,data.amount);


    })
}


for (const data of e2eTcFt21TestData) {
    myTest("TC-FT-21",async({page,request})=>{
        const home = new Homepage(page);
        const fund= new FundTranserPage(page);
        const assert= new assertClass(page);

        const fromAccntBefore= await baseApi.getFunc(`/parabank/services/bank/accounts/${data.lowBalAccount}`);
        const toAccntBefore= await baseApi.getFunc(`/parabank/services/bank/accounts/${data.account2}`);

        const fromObj= parser.parse(await fromAccntBefore.text());
        const toObj= parser.parse(await toAccntBefore.text());

        const fromBalBefore=fromObj.account.balance;
        const toBalBefore= toObj.account.balance;

        await home.clickTransferFunds();
        await fund.enterAmount(data.insuffAmount);
        await fund.selectFromAccount(data.lowBalAccount);
        await fund.selectToAccount(data.account2);
        await fund.clickTransferButton();

        
        const fromAccntAfter= (await baseApi.getFunc(`/parabank/services/bank/accounts/${data.lowBalAccount}`));
        const toAccntAfter= (await baseApi.getFunc(`/parabank/services/bank/accounts/${data.account2}`));

        const fromObj2= parser.parse(await fromAccntAfter.text());
        const toObj2= parser.parse(await toAccntAfter.text());

        const fromBalAFter= fromObj2.account.balance;
        const toBalAFter= toObj2.account.balance;

        await assert.assertMatch(fromBalAFter,fromBalBefore);
        await assert.assertMatch(toBalAFter,toBalBefore);

        const ErrrMsgHeading = await fund.getTransferErrorMessageHeading();
        await assert.assertMatch(ErrrMsgHeading,errorHeading);

        const ErrrMsg = await fund.getTransferErrorMessage();
        await assert.assertMatch(ErrrMsg,errorMessage);


    })
}


})