const bcryptjs = require("bcryptjs");
const { response } = require("express");


const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });


        if (!user) {
            const data = {
                name,
                email,
                password: ':p',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Contact to the admin'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token cannot be verified'
        });
    }
}


module.exports = {
    login,
    googleSignIn
}