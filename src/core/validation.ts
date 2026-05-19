import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

addFormats(ajv);

const cache = new Map();

export function getValidator(schema: any) {
  if (cache.has(schema)) return cache.get(schema);

  const validate = ajv.compile(schema);

  cache.set(schema, validate);

  return validate;
}