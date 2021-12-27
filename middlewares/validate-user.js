
const { response } = require('express');


const isUserAuthorized = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Verify, but token is not validated'
        });
    }

    const { id } = req.params;
    const { _id, name } = req.user;

    if (JSON.stringify(id) !== JSON.stringify(_id)) {
        return res.status(401).json({
            msg: `${name} is not a valid user`
        });
    }

    next();

}

module.exports = {
    isUserAuthorized
}