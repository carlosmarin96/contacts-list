const { Router } = require('express');
const { check } = require('express-validator');

const { postUser, putUser, deleteUser } = require('../controllers/users.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const Role = require('../models/role');

const router = Router();

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password must be 6 characters or more').isLength({ min: 6 }),
    // check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(async (role = '') => {
        const roleExist = await Role.findOne({ role });
        if (!roleExist) {
            throw new Error(`Role ${role} is not valid`);
        }
    }),
    validateFields
], postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
