const Joi = require('joi');

module.exports = {
    validateRequestBody: (requestBody) =>{
        const schema = Joi.object().keys({
            productName: Joi.string().required(),
            productImageUrl: Joi.string().required(),
            productDescription: Joi.string().required(),
            productCategoryId: Joi.array().required(),
        })
        const { value, error } = Joi.validate(requestBody, schema,{ abortEarly: false ,allowUnknown: true });
        if (error && error.details) {
          return { error };
        }
        return { value };
    },
}