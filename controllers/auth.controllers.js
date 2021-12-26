const bcryptjs = require("bcryptjs");
const { response } = require("express");


const { generateJWT } = require("../helpers/generate-jwt");
const User = require('../models/user');


const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        // Verify if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User or password is not correct'
            });
        }

        // Verify if user is active
        if (user.status === false) {
            return res.status(400).json({
                msg: 'User or password is not correct'
            });
        }

        // Verify Password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User or password is incorrect'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Contact to admin'
        });
    }


}


module.exports = {
    login
}