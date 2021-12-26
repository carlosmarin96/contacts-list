
const { response } = require('express');

const isUserAuthorized = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Verify, but token is not validated'
        });
    }

    const { id } = req.params;
    const { uid, name, role } = req.user;

    if (id !== uid || role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not a valid user`
        });
    }

    next();

}

module.exports = {
    isUserAuthorized
}