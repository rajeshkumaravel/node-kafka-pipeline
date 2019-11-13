/* eslint-disable */
const Ajv = require('ajv');

const ajv = Ajv({ allErrors: true, removeAdditional: 'all' });
const userSchema = require('../json_schema/user.schema');

ajv.addSchema(userSchema, 'userSchema');

/**
 * Format error responses
 * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
 * @return {String} formatted api response
 */
function errorResponse(schemaErrors) {
  const errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message,
    };
  });
  return {
    status: 'failed',
    errors: errors
  };
}

/**
 * Validates incoming request bodies against the given schema,
 * providing an error response when validation fails
 * @param  {String} schemaName  - name of the schema to validate
 * @param  {Array} schemaName   - Array of objects to validate
 * @return {Object} response
 */
const validateSchema = (schemaName, payload, cb) => {
    const valid = ajv.validate(schemaName, payload);
    if (!valid) {
      cb({
        code: 400,
        message: 'Invalid payload',
        errors: errorResponse(ajv.errors).errors
      });
    } else {
      cb(null);
    }
};

module.exports = validateSchema;
