const Joi = require('joi');

module.exports = {
    validateRequestBody: (requestBody) =>{
        const schema = Joi.object().keys({
            name: Joi.string().required()
        })
        const { value, error } = Joi.validate(requestBody, schema,{ abortEarly: false });
        if (error && error.details) {
          return { error };
        }
        return { value };
    },
    //
}