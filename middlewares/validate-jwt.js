const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        // Read user that corresponds to uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'No user'
            });
        }

        // Verify if user has status: true
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Invalid token'
        });
    }


}

module.exports = {
    validateJWT
}