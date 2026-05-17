# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\uiNegTests.spec.ts >> ParaBank Fund Transfer UI Tests >> @ui TC-FT-06 
- Location: tests\ui\uiNegTests.spec.ts:34:15

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('//div[@id=\'showError\']/h1') to be visible
    54 × locator resolved to hidden <h1 class="title">↵⇆⇆⇆Error!↵⇆⇆</h1>

```

# Test source

```ts
  1   | import { Page } from "@playwright/test";
  2   | 
  3   | export default class FundTranserPage{
  4   |     constructor(public page:Page){
  5   | 
  6   |     }
  7   | 
  8   |     async enterAmount(amount:string){
  9   |         await this.page.locator("//input[@id='amount']").fill(amount);
  10  |     }
  11  | 
  12  |     async selectFromAccount(account:string){
  13  |         await this.page.locator("//select[@id='fromAccountId']").selectOption(account);
  14  |     }
  15  | 
  16  |     async selectToAccount(account:string){
  17  |         await this.page.locator("//select[@id='toAccountId']").selectOption(account);
  18  |     }
  19  | 
  20  |     async clickTransferButton(){
  21  |         await this.page.locator("//input[@value='Transfer']").click();
  22  |     }
  23  | 
  24  |     async getConfirmationAmountNumberOnly(){
  25  |         const locator = this.page.locator("//span[@id='amountResult']");
  26  |         await locator.waitFor({ state: 'visible' }); 
  27  |         const amountText = await locator.textContent();
  28  |         if (!amountText) {
  29  |             throw new Error('Confirmation from account is null or empty');
  30  |         }
  31  |         const amountValue = parseFloat(
  32  |             amountText.replace(/[$,]/g, '').trim()
  33  |         );
  34  |         const finalAmmount:string=String(amountValue);
  35  |         return finalAmmount;
  36  |     }
  37  | 
  38  |     async getConfirmationAmountWithDecimel(){
  39  |         const locator = this.page.locator("//span[@id='amountResult']");
  40  |         await locator.waitFor({ state: 'visible' }); 
  41  |         const amountText = await locator.textContent();
  42  |         if (!amountText) {
  43  |             throw new Error('Confirmation amount is null or empty');
  44  |         }
  45  |         const amountValue = amountText.replace(/[$,]/g,'').trim();
  46  |         return amountValue;
  47  |     }
  48  | 
  49  |     async getConfirmationFromAccount(){
  50  |         const locator = this.page.locator("//span[@id='fromAccountIdResult']");
  51  |         await locator.waitFor({ state: 'visible' }); 
  52  |         const account = await locator.textContent();
  53  |         if (!account) {
  54  |             throw new Error('Confirmation from account is null or empty');
  55  |         }
  56  |         return account;
  57  |     }
  58  | 
  59  |     async getConfirmationToAccount(){
  60  |         const locator = this.page.locator("//span[@id='toAccountIdResult']");
  61  |         await locator.waitFor({ state: 'visible' }); 
  62  |         const account = await locator.textContent();
  63  |         if (!account) {
  64  |             throw new Error('Confirmation To account is null');
  65  |         }
  66  |         return account;
  67  |     }
  68  | 
  69  |     async getTransferCompleteMessageHeading(){
  70  |         const locator = this.page.locator("//h1[text()='Transfer Complete!']");
  71  |         await locator.waitFor({ state: 'visible' }); 
  72  |         const message=await locator.textContent();
  73  |         if (!message) {
  74  |             throw new Error('Confirmation msg heading is null');
  75  |         }
  76  |         return message;
  77  |     }
  78  | 
  79  |     async getTransferErrorMessageHeading(){
  80  |         const locator = this.page.locator("//div[@id='showError']/h1");
> 81  |         await locator.waitFor({ state: 'visible' }); 
      |                       ^ Error: locator.waitFor: Target page, context or browser has been closed
  82  |         const message=await locator.textContent();
  83  |         if (!message) {
  84  |             throw new Error('Error msg heading is null');
  85  |         }
  86  |         return message;
  87  |     }
  88  | 
  89  |     async getTransferErrorMessage(){
  90  |         const locator = this.page.locator("//div[@id='showError']/p");
  91  |         await locator.waitFor({ state: 'visible' }); 
  92  |         const message=await locator.textContent();
  93  |         if (!message) {
  94  |             throw new Error('Error msg heading is null');
  95  |         }
  96  |         return message;
  97  |     }
  98  | 
  99  | 
  100 | 
  101 | }
  102 | 
  103 | 
```