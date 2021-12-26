const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const validateUser = require('../middlewares/validate-user');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateUser
}