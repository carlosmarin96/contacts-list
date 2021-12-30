
const { Role, User, Gender, Contact } = require('../models');

const contactExist = async (id) => {
    const contactExist = await Contact.findById(id);

    if (!contactExist) {
        throw new Error(`Contact ${contactExist} is not valid`);
    }

}

const genderValidation = async (gender = '') => {
    const genderExist = await Gender.findOne({ gender });
    if (!genderExist) {
        throw new Error(`Gender ${genderExist} is not valid`);
    }
}

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

const validateUser = async (id) => {

    const idFromUser = req.user._id;
    const contact = await Contact.findById(id);

    if (JSON.stringify(contact.createdBy) !== JSON.stringify(idFromUser)) {
        throw new Error("No authorized");
    }
}

module.exports = {
    roleValidation,
    emailValidation,
    userExistById,
    genderValidation,
    contactExist,
    validateUser
}