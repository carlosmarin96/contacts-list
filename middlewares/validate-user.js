
const { response } = require('express');

const isUserAuthenticated = (req, res = response, next) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(500).json({
            msg: 'Verify, but token is not validated'
        });
    }

    const { uid, name } = req.user;

    if (id !== uid) {
        return res.status(401).json({
            msg: `${name} is not a valid user`
        });
    }

    next();

}

module.exports = {
    isUserAuthenticated
}