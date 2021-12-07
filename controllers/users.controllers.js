const {response} = require('express');

const postUser = (req, res = response) => {
    const {name, lastName, email, password, role, date} = req.body;

    res.json({
        name,
        lastName,
        email,
        password,
        role,
        date
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
        id
    });
}

module.exports = {
    postUser,
    putUser,
    deleteUser
}