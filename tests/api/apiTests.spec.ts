import { expect, request } from '@playwright/test';
import { myTest } from '../../fixtures/myFixture';
import LoginPage from '../../pages/loginpage';
import { XMLParser } from 'fast-xml-parser';
import assertClass from '../../utils/assert';
import { BaseAPi } from '../../basepage/baseApi';



import apiTestData from '../../test-data/api-test-data.json';

myTest.describe('API Tests', () => {

    let baseApi:BaseAPi;
    let transactionid=0;

    myTest.beforeEach('before each hook', async () => {
        baseApi=new BaseAPi();
        await baseApi.init();
        // const loginPage = new LoginPage(page);
        // await loginPage.navigateTo(data.url);
        
    });

    myTest.afterEach('after each hook', async () => {
        // await page.close();
        await baseApi.dispose();
    });

    myTest("TC-FT-16", async ({ request }) => {
        const response=await baseApi.getFunc(`/parabank/services/bank/accounts/${apiTestData.accountId}/transactions`);
        assertClass.verifyStatusCOde(response,200);
        
        const xmlText=await response.text();
        const parser=new XMLParser();
        const jsonObj=parser.parse(xmlText);


        const List = jsonObj.transactions.transaction;
        // const transactions = Array.isArray(List) ? List : [List];
        const transactions =List;
        const lastIndex=transactions.length-1
        const lastTransaction = transactions[lastIndex];
        // console.log(lastTransaction);
        
        transactionid=lastTransaction.id;

        // console.log(transactionid);
        
        
        assertClass.assertApiData(lastTransaction.type,'Debit');
        assertClass.assertApiData(String(lastTransaction.amount),apiTestData.transferAmount);        
    });

    myTest("TC-FT-17", async ({ request }) => {
        const response=await baseApi.getFunc(`/parabank/services/bank/accounts/${apiTestData.accountId}`);
        assertClass.verifyStatusCOde(response,200);
        
        const xmlText = await response.text();
        
        const parser = new XMLParser();
        const jsonObj = parser.parse(xmlText);
        
        const accountData = jsonObj.account;
        // console.log(accountData.balance);
        
        expect(accountData).toHaveProperty('balance');
        expect(parseFloat(accountData.balance)).not.toBeNaN();
    });

    myTest("TC-FT-18",async({request})=>{
        const response1=await baseApi.getFunc(`/parabank/services/bank/accounts/${apiTestData.accountId}/transactions`);
        assertClass.verifyStatusCOde(response1,200);
        
        const xmlText=await response1.text();
        const parser=new XMLParser();
        const jsonObj=parser.parse(xmlText);


        const List = jsonObj.transactions.transaction;
        const transactions =List;
        const lastIndex=transactions.length-1
        const lastTransaction = transactions[lastIndex];
        // console.log(lastTransaction);
        transactionid=Number(lastTransaction.id);
        // console.log(transactionid);
        

        const response2=await baseApi.getFunc(`/parabank/services/bank/transactions/${transactionid}`);
        assertClass.verifyStatusCOde(response2,200);

        const TransacxmlText=await response2.text();
        const jsonObj2=parser.parse(TransacxmlText);

        const transDetails=jsonObj2.transaction;
                
        assertClass.assertApiData(transDetails.type,'Debit');
        assertClass.assertApiData(String(transDetails.amount),apiTestData.transferAmount);        

    })

    myTest("TC-FT-19", async ({ request }) => {
        const response=await baseApi.getFunc(`/parabank/services/bank/accounts/${apiTestData.accountId}/transactions/amount/${apiTestData.transferAmount}`);
        expect(response.status()).toBe(200);
        
        const parser= new XMLParser();
        const xmlText = await response.text();
        const jsonObj = parser.parse(xmlText);
        
        const List = jsonObj.transactions.transaction;
        // console.log(List);   // below is to handle list or single object
        const arrayList = Array.isArray(List) ? List : [List];
        // console.log(arrayList);

        for (const transaction of arrayList) {
            assertClass.assertApiData(String(transaction.amount),apiTestData.transferAmount);
        }
    });
    
});