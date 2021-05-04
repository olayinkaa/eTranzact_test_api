const Joi = require('joi');

module.exports = {
    validateRequestBody: (requestBody) =>{
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
        })
        const { value, error } = Joi.validate(requestBody, schema,{ abortEarly: false ,allowUnknown: true });
        if (error && error.details) {
          return { error };
        }
        return { value };
    },
    //
}