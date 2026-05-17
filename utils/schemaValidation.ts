import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });

export function validateAccountSchema(schema:any,data: any): boolean {
  
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if(!valid){
    throw new Error("Failed Schema Validation");
  }else{
    console.log("Schema Validaion Sucessful");
    
    return valid;
  }
}