const _ = require('lodash');

const Validator = require('validator');


module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !_.isEmpty(data.name) ? data.name : '';
    data.phoneNumber = !_.isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.email = !_.isEmpty(data.email) ? data.email : '';
    data.password = !_.isEmpty(data.password) ? data.password : '';
    data.password_confirm = !_.isEmpty(data.password_confirm) ? data.password_confirm : '';

    // if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
    //     errors.name = 'Name must be between 2 to 30 chars';
    // }
    
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = 'phoneNumber field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}