const Joi = require('joi');
const bcrypt = require('bcryptjs');

module.exports = {
    validateRequestBody: (requestBody) =>{
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            username: Joi.string().required(),
            gender: Joi.string().required(),
            password: Joi.string().required(),
            contactInfo: Joi.array().items(
                Joi.object({
                    address: Joi.string().required(),
                    phoneNumber: Joi.string().required()
                })
            )
            //
        })
        const { value, error } = Joi.validate(requestBody, schema,{ abortEarly: false, allowUnknown: true });
        if (error && error.details) {
          return { error };
        }
        return { value };
    },
    validateLogin(body) {
        const schema = Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        });
        const { value, error } = Joi.validate(body, schema,{ abortEarly: false ,allowUnknown: true });
        if (error && error.details) return { error }
        return { value };
    },
    encryptPassword(plainText) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainText, salt);
    },
    comparePassword(plainText, encrypedPassword) {
        return bcrypt.compareSync(plainText, encrypedPassword);
    },
    //
}