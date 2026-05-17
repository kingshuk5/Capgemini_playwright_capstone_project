import { myTest } from '../../fixtures/myFixture';
import LoginPage from '../../pages/loginpage';
import Homepage from '../../pages/homepage';
import FundTranserPage from '../../pages/fundTransferPage';
import assertClass from '../../utils/assert';
import testData from '../../test-data/ui-neg-test-data.json'



const loginUsername = "kingshuk5";
const password = "123";

const errorHeading=`
			Error!
		`
const errorMessage=`
			An internal error has occurred and has been logged.
		`

const confMsgHead="Transfer Complete!"


myTest.describe('ParaBank Fund Transfer UI Tests', () => {
        
    myTest.beforeEach('before each Tests', async ({ page, data }) => {
        const loginPage: LoginPage = new LoginPage(page);
        await loginPage.navigateTo(data.url);
        await loginPage.loginFUnction(loginUsername, password);
    });

    myTest.afterEach('after each Tests', async ({ page }) => {
         await page.close();
    });

    
    for (const data of testData) {
        myTest(`${data.id} `, async ({ page }) => {
            const home: Homepage = new Homepage(page);
            const fundPage: FundTranserPage = new FundTranserPage(page);
            const assert: assertClass = new assertClass(page);

            await home.clickTransferFunds();
            await fundPage.enterAmount(data.amount);
            await fundPage.selectFromAccount(data.fromAccount);
            await fundPage.selectToAccount(data.toAccount);
            await fundPage.clickTransferButton();

            const actualErrorHeading = await Promise.race([
                fundPage.getTransferErrorMessageHeading(),
                fundPage.getTransferCompleteMessageHeading()
            ]) ;
            // const actualErrorMsg = await fundPage.getTransferErrorMessage();
    
            await assert.assertMatch(actualErrorHeading, errorHeading);
            // await assert.assertMatch(actualErrorMsg, errorMessage);
        });
    }

});
