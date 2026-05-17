import { expect, Page } from '@playwright/test';
import { myTest } from '../../fixtures/myFixture';
import LoginPage from '../../pages/loginpage';
import BasePage from '../../basepage/basepage';
import Homepage from '../../pages/homepage';
import FundTranserPage from '../../pages/fundTransferPage';
import assertClass from '../../utils/assert';
import accountOverviewPage from '../../pages/accountOverview';
import loginData from '../../test-data/ui-loginDetails-test-data.json';
import tc01data from '../../test-data/ui-tcFt01Data.json';
import tc02_04data from '../../test-data/ui-tcFt02-04Data.json.json';
import tc03data from '../../test-data/ui-tcFt03Data.json';
import tc14data from '../../test-data/ui-tcFt14Data.json';
import tc23data from '../../test-data/ui-tcFt23Data.json';




const loginUsername=loginData.loginUsername;
const password=loginData.password
const confMsgHead="Transfer Complete!"

const errorHeading=`
			Error!
		`
const errorMessage=`
			An internal error has occurred and has been logged.
		`


// const amount1="100"
// const fromAccount1="14787"
// const toAccount1="14898"

// const amount2="75.00"
// const fromAccount2="14787"
// const toAccount2="14898"

// const fromAccount3="14787"
// const toAccount3="14898"

// const amount4="50.50"
// const fromAccount4="14787"
// const toAccount4="14898"

// const amount5="100"
// const fromAccount5="17007"
// const toAccount5="14454"

// const amount6_1="100"
// const fromAccount6="13788"
// const toAccount6="14121"
// const amount6_2="abc"





myTest.describe('ParaBank Fund Transfer UI Tests',()=>{
        
    myTest.beforeEach('before each Tests',async({page,data})=>{
        const base:BasePage=new BasePage(page);
        const loginPage:LoginPage=new LoginPage(page);
          
        await loginPage.navigateTo(data.url);
        await loginPage.loginFUnction(loginUsername,password);
    })

    myTest.afterEach('after each Tests',async({page,data})=>{
        //  const base:BasePage=new BasePage(page);
        //  await base.closePage();
         await page.close();

    })
    for(const data of tc01data ){
    myTest("TC-FT-01",async({page})=>{
        const home:Homepage=new Homepage(page);
        const fundPage:FundTranserPage=new FundTranserPage(page);
        const assert:assertClass=new assertClass(page);


        await home.clickTransferFunds();
        await fundPage.enterAmount(data.amount);
        await fundPage.selectFromAccount(data.fromAccount);
        await fundPage.selectToAccount(data.toAccount);
        await fundPage.clickTransferButton();

        const confirmationAmmount=await fundPage.getConfirmationAmountNumberOnly();
        const fromAccountConf= await fundPage.getConfirmationFromAccount();
        const toAccountConf=await fundPage.getConfirmationToAccount();
        const confMsgHeading=await fundPage.getTransferCompleteMessageHeading();

        await assert.assertAmmount(confirmationAmmount,data.amount);
        await assert.assertAccount(fromAccountConf,data.fromAccount);
        await assert.assertAccount(toAccountConf,data.toAccount);
        await assert.assertMatch(confMsgHeading,confMsgHead);
    })
}


   for (const data of tc02_04data) {
        myTest(data.id, async ({ page }) => {
            const home: Homepage = new Homepage(page);
            const fundPage: FundTranserPage = new FundTranserPage(page);
            const assert: assertClass = new assertClass(page);

            await home.clickTransferFunds();
            await fundPage.enterAmount(data.amount);
            await fundPage.selectFromAccount(data.fromAccount);
            await fundPage.selectToAccount(data.toAccount);
            await fundPage.clickTransferButton();

            const confirmationAmmount = await fundPage.getConfirmationAmountWithDecimel();
            const fromAccountConf = await fundPage.getConfirmationFromAccount();
            const toAccountConf = await fundPage.getConfirmationToAccount();
            const confMsgHeading = await fundPage.getTransferCompleteMessageHeading();

            await assert.assertAmmount(confirmationAmmount, data.amount);
            await assert.assertAccount(fromAccountConf, data.fromAccount);
            await assert.assertAccount(toAccountConf, data.toAccount);
            await assert.assertMatch(confMsgHead, confMsgHeading);
        });
    }
    for(const data of tc03data ){
    myTest("TC-FT-03",async({page})=>{
        const home:Homepage=new Homepage(page);
        const fundPage:FundTranserPage=new FundTranserPage(page);
        const assert:assertClass=new assertClass(page);
        const overview:accountOverviewPage=new accountOverviewPage(page);

        await home.clickOverView();
        
        const beforeBal= await overview.getAccountBalance(data.fromAccount);
        

        await home.clickTransferFunds();
        await fundPage.enterAmount(beforeBal);
        await fundPage.selectFromAccount(data.fromAccount);
        await fundPage.selectToAccount(data.toAccount);
        await fundPage.clickTransferButton();

        const confirmationAmmount=await fundPage.getConfirmationAmountWithDecimel();

        await home.clickOverView();

        const afterBal=await overview.getAccountBalance(data.fromAccount);

        await assert.assertAmmount(confirmationAmmount,beforeBal);
        await assert.assertMatch("0.00",afterBal);
        
    })
}


for(const data of tc14data ){
    myTest("TC-FT-14",async({page})=>{
        const home:Homepage=new Homepage(page);
        const fundPage:FundTranserPage=new FundTranserPage(page);
        const assert:assertClass=new assertClass(page);
        const overview:accountOverviewPage=new accountOverviewPage(page);

                      
        await home.clickTransferFunds();
        await fundPage.enterAmount(data.amount);
        await fundPage.selectFromAccount(data.fromAccount);
        await fundPage.selectToAccount(data.toAccount);
        await fundPage.clickTransferButton();

        const confirmationAmmount=await fundPage.getConfirmationAmountWithDecimel();

        await home.clickOverView();

        const afterBal=await overview.getAccountBalance(data.fromAccount);

        await assert.assertAmmount(confirmationAmmount,"100.00");
        await assert.assertMatch("0.00",afterBal);
        
    })
}

for(const data of tc23data ){
    myTest("TC-FT-23",async({page})=>{
        const home:Homepage=new Homepage(page);
        const fundPage:FundTranserPage=new FundTranserPage(page);
        const assert:assertClass=new assertClass(page);


        await home.clickTransferFunds();
        await fundPage.enterAmount(data.amount_1);
        await fundPage.selectFromAccount(data.fromAccount);
        await fundPage.selectToAccount(data.toAccount);
        await fundPage.clickTransferButton();

        const confirmationAmmount=await fundPage.getConfirmationAmountNumberOnly();
        const fromAccountConf= await fundPage.getConfirmationFromAccount();
        const toAccountConf=await fundPage.getConfirmationToAccount();
        const confMsgHeading=await fundPage.getTransferCompleteMessageHeading();

        await assert.assertAmmount(confirmationAmmount,data.amount_1);
        await assert.assertAccount(fromAccountConf,data.fromAccount);
        await assert.assertAccount(toAccountConf,data.toAccount);
        await assert.assertMatch(confMsgHeading,confMsgHead);

        await home.clickTransferFunds();
        await fundPage.enterAmount(data.amount_2);
        await fundPage.selectFromAccount(data.fromAccount);
        await fundPage.selectToAccount(data.toAccount);
        await fundPage.clickTransferButton();

        const actualErrorHeading = await fundPage.getTransferErrorMessageHeading();
        const actualErrorMsg = await fundPage.getTransferErrorMessage();
    
        await assert.assertMatch(actualErrorHeading, errorHeading);
        await assert.assertMatch(actualErrorMsg, errorMessage);
    })
}




})

const RedirectErrorHeading="Error!"
const RedirecErrorMsg="An internal error has occurred and has been logged."
const RedirectLoginHeading="Customer Login"

myTest("TC-FT-22",async({page})=>{
        const home:Homepage=new Homepage(page);
        const assert:assertClass=new assertClass(page);

        await page.goto("https://parabank.parasoft.com/parabank/transfer.htm");

        const actualErrorHeading = await home.getTransferErrorMessageHeading();
        const actualErrorMsg = await home.getTransferErrorMessage();
        const actualLoginHeading=await home.getLoginMessage();
    
        await assert.assertMatch(actualErrorHeading, RedirectErrorHeading);
        await assert.assertMatch(actualErrorMsg, RedirecErrorMsg);
        await assert.assertMatch(actualLoginHeading, RedirectLoginHeading);

        await page.close();


})


