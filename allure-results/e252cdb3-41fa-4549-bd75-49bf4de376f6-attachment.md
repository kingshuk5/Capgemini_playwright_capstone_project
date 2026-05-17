# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\e2e.spec.ts >> e2e test cases >> @e2e TC-FT-20
- Location: tests\e2e\e2e.spec.ts:81:11

# Error details

```
Error: strict mode: unknown keyword: "?xml"
```

# Test source

```ts
  1  | import Ajv from 'ajv';
  2  | 
  3  | const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
  4  | 
  5  | export function validateAccountSchema(schema:any,data: any): boolean {
  6  |   
> 7  |   const validate = ajv.compile(schema);
     |                        ^ Error: strict mode: unknown keyword: "?xml"
  8  |   const valid = validate(data);
  9  |   if(!valid){
  10 |     throw new Error("Failed Schema Validation");
  11 |   }else{
  12 |     console.log("Schema Validaion Sucessful");
  13 |     
  14 |     return valid;
  15 |   }
  16 | }
```