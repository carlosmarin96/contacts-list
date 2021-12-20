
const Role = require('../models/role');
const user = require('../models/user');

const roleValidation = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`Role ${role} is not valid`);
    }
}

const emailValidation = async (email = '') => {
    const emailExists = await user.findOne({ email });
    if (emailExists) {
        throw new Error(`This email was already registred`);
    }
}




module.exports = {
    roleValidation,
    emailValidation
}