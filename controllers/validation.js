const joi = require("joi");


module.exports.registerValidation = (data) => {
        const schema = joi.object({
            firstname: joi.string().min(6).trim().required(),
            lastname: joi.string().min(6).trim().required(),
            address: joi.string().min(6).trim().required(),
            // email: joi.string().min(6).required().alphanum(),
            // password: joi.string().min(6).required()
        }).unknown();
    
    return schema.validate(data);
}