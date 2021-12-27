const { Router } = require('express');
const { check } = require('express-validator');

const { postUser, putUser, deleteUser } = require('../controllers/users.controllers');

const { roleValidation, emailValidation, userExistById } = require('../helpers/db-validators');

const { validateFields, validateJWT, isUserAuthorized } = require('../middlewares');

const router = Router();

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailValidation),
    check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
    check('role').optional().custom(roleValidation),
    validateFields
], postUser);

router.put('/:id', [
    validateJWT,
    isUserAuthorized,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], putUser);

router.delete('/:id', [
    validateJWT,
    isUserAuthorized,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], deleteUser);

module.exports = router;
