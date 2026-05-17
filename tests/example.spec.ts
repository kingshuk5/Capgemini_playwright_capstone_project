import { test, expect } from '@playwright/test';
import { myTest } from '../fixtures/myFixture';
import LoginPage from '../pages/loginpage';
import BasePage from '../basepage/basepage';


myTest("test",async({page,data})=>{
  const base:BasePage=new BasePage(page);
  const loginPage:LoginPage=new LoginPage(page);
  await loginPage.navigateTo(data.url);
  await loginPage.loginFUnction("kingshuk5","123");
  await page.waitForTimeout(2000);
  // await base.close();
  await page.close();
})