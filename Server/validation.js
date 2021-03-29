const joi = require('joi');

const registerValidation = (body) => {
    const joiSchema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(8).required(),
        name: joi.string().min(6).required()
    });
    return joiSchema.validate(body);
};

const loginValidation = (body) => {
    const joiSchema = joi.object({
        email:joi.string().required().email(),
        password: joi.string().min(8).required()
    });
    return joiSchema.validate(body);
}

const restaurantValidation = (body) => {
    const joiSchema = joi.object({
        name: joi.string().min(3).max(255).required(),
        city: joi.string().min(3).max(255).required(),
        address: joi.string(),
        phone: joi.string().required(),
        type: joi.string()
    });
    return joiSchema.validate(body);
}

const employeeValidation = (body) => {
    const joiSchema = joi.object({
        firstName: joi.string().min(3).max(255).required(),
        lastName: joi.string().min(3).max(255).required(),
        mobilePhone: joi.string().required(),
        position: joi.string().required(),
        salary: joi.number().required()
    })

    return joiSchema.validate(body);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.restaurantValidation = restaurantValidation;
module.exports.employeeValidation = employeeValidation;