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
            bestSeller:Joi.bool().required().valid([true,false]),
            hotSale:Joi.number().required().when('bestSeller',{
              is:true,
              then:Joi.number().required().valid([0]).error((errors) => {
                return errors.map(error => {
                  switch (error.type) {
                    case "number.base":
                      return { message: "hotSale must be a number of value 0, when bestSeller is true" };
                    case "any.allowOnly":
                      return { message: "hotSale must be of value 0, if bestSeller is true" };
                  }
                }
                )
              }),
              otherwise:Joi.number().valid([0,1]).error((errors) => {
                return errors.map(error => {
                  switch (error.type) {
                    case "number.base":
                      return { message: "hotSale must be a number" };
                    case "any.allowOnly":
                      return { message: "hotSale must be of value 0 or 1" };
                  }
                }
                )
              })
            }),
            productPrice: Joi.number().required(),
            category: Joi.array().required().min(1),
        })
        const { value, error } = Joi.validate(requestBody, schema,{ abortEarly: false ,allowUnknown: true });
        if (error && error.details) {
          return {error}
        }
        return { value };
    },
}