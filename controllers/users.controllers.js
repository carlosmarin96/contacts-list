const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const postUser = async (req, res = response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    const { name, lastName, email, password, role } = req.body;
    const user = new User({ name, lastName, email, password, role });

    //verify if email exist
    const emailExists = await User.findOne({ email });

    if (emailExists) {
        return res.status(400).json({
            msg: 'Email was already taken'
        });
    }

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save in DB
    await user.save();

    res.json({
        user
    });
}

const putUser = (req, res = response) => {
    const { id } = req.params;

    res.json({
        id
    });
}

const deleteUser = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'Contacts list',
        id
    });
}

module.exports = {
    postUser,
    putUser,
    deleteUser
}