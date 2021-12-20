const { Router } = require('express');
const { check } = require('express-validator');

const { postUser, putUser, deleteUser } = require('../controllers/users.controllers');

const { roleValidation, emailValidation } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailValidation),
    check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
    check('role').custom(roleValidation),
    validateFields
], postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
