
const Role = require('../models/role');
const User = require('../models/user');

const roleValidation = async (role = '') => {
    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`Role ${role} is not valid`);
    }
}

const emailValidation = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`This email was already registred`);
    }
}

const userExistById = async (id) => {
    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`${id} does not exist`);
    }
}


module.exports = {
    roleValidation,
    emailValidation,
    userExistById
}