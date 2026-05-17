# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\e2e.spec.ts >> e2e test cases >> @e2e TC-FT-21
- Location: tests\e2e\e2e.spec.ts:134:11

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 16900
Received: 17400
```

# Test source

```ts
  1  | import { APIResponse, Page ,expect} from "@playwright/test";
  2  | 
  3  | export default class assertClass{
  4  |     constructor(public page:Page){
  5  | 
  6  |     }
  7  | 
  8  |     async assertAmmount(EnteredAmount:string,displayedAmount:string){
  9  |         await expect(EnteredAmount).toEqual(displayedAmount)
  10 |     }
  11 |     async assertAccount(EnteredAccount:string,displayedAccount:string){
  12 |         await expect(EnteredAccount).toEqual(displayedAccount)
  13 |     }
  14 |     async assertMatch(Entered:string,displayed:string){
> 15 |         await expect(Entered).toBe(displayed)
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  16 |     }
  17 | 
  18 |     static verifyStatusCOde(response:APIResponse,code :number){
  19 |         expect(response.status()).toBe(code);
  20 |     }
  21 | 
  22 |     static assertApiData(Entered:string,displayed:string){
  23 |         expect(Entered).toBe(displayed)
  24 |     }
  25 |     
  26 | }
```