import { expect } from '@playwright/test';
import { myTest } from '../../fixtures/myFixture';
import LoginPage from '../../pages/loginpage';
import assertClass from '../../utils/assert';
import { BaseAPi } from '../../basepage/baseApi';

// Data profiling import configuration
import apiTestData from '../../test-data/api-test-data.json';

myTest.describe('ParaBank Performance Engineering Suite', () => {

    let baseApi: BaseAPi;

    myTest.beforeEach('before each hook', async () => {
        baseApi = new BaseAPi();
        await baseApi.init();
    });

    myTest.afterEach('after each hook', async () => {
        await baseApi.dispose();
    });

        myTest("@performance-lite UI load time", async ({ page,data:urlData }) => {
            const loginPage = new LoginPage(page);
            await loginPage.navigateTo(urlData.url);

            const loadTimeMs = await page.evaluate(() => {
                const timing = window.performance.timing;
                return timing.loadEventEnd - timing.navigationStart;
            });

            console.log(loadTimeMs);
            expect(loadTimeMs).toBeGreaterThan(0);

            await page.close();
        });

    for (const data of apiTestData) {
        myTest("@performance-lite Api response time > 2 se", async () => {
            const EndpointUrl = `/parabank/services/bank/accounts/${data.accountId}`;
            
            const start = Date.now();
            const response = await baseApi.getFunc(EndpointUrl);
            const duration = Date.now() - start;

            console.log(duration);
            assertClass.verifyStatusCOde(response, 200);
            expect(duration).toBeLessThan(2000);
        });
    }

    for (const data of apiTestData) {
        myTest("@performance-lite Throughput for 20 parallel  req", async () => {
            const EndpointUrl = `/parabank/services/bank/accounts/${data.accountId}`;
            const ReqCount = Array.from({ length: 20 });
            
            const start= Date.now();
            const mappingAsyncReq =ReqCount.map(() => 
                baseApi.getFunc(EndpointUrl)
            );
            const parallelReq = await Promise.all(mappingAsyncReq);
            const End = Date.now() -start;

            console.log(End);
            
            for (const eachRes of parallelReq) {
                assertClass.verifyStatusCOde(eachRes, 200);
            }
        });
    }
});