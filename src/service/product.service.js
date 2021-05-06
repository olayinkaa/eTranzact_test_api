const Joi = require('joi');

module.exports = {
    validateRequestBody: (requestBody) =>{
        const schema = Joi.object().keys({
            productName: Joi.string().required().error(() => {
                return {
                  message: 'Product Name is required.',
                };
              }),
            productImageUrl: Joi.string().required().error(() => {
                return {
                  message: 'Product imageUrl is required.',
                };
            }),
            productDescription: Joi.string().required().error(() => {
                return {
                  message: 'Product Description is required.',
                };
            }),
            productPrice: Joi.number().required(),
            category: Joi.array().required(),
        })
        const { value, error } = Joi.validate(requestBody, schema,{ abortEarly: false ,allowUnknown: true });
        if (error && error.details) {
          return {error}
        }
        return { value };
    },
}