const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const postUser = async (req, res = response) => {

    const { name, lastName, email, password, role } = req.body;
    const user = new User({ name, lastName, email, password, role });

    //Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Save in DB
    await user.save();

    res.json({
        user
    });
}

const putUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, creation_date, email, ...rest } = req.body;

    //Validate id in DB
    if (password) {
        //Encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        id,
        user
    });
}

const deleteUser = async (req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

    res.json(user);
}

module.exports = {
    postUser,
    putUser,
    deleteUser
}