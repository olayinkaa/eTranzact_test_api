const Joi = require('joi');

module.exports = {
    validateRequestBody: (requestBody) =>{
        const schema = Joi.object().keys({
            name: Joi.string().required().error(() => {
                return {
                  message: 'Name is required.',
                };
            }),
            description: Joi.string().required().error(() => {
                return {
                  message: 'Description is required.',
                };
            }),
        })
        const { value, error } = Joi.validate(requestBody, schema,{ abortEarly: false ,allowUnknown: true });
        if (error && error.details) {
          return { error };
        }
        return { value };
    },
    //
}