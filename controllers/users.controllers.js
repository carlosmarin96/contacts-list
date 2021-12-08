const {response} = require('express');
const User = require('../models/user');

const postUser = async(req, res = response) => {

    const body = req.body;
    const user = new User(body);

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