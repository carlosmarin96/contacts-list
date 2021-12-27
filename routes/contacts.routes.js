const { Router } = require('express');
const { check } = require('express-validator');

const { postContact, getContacts } = require('../controllers/contacts.controllers');
const { genderValidation } = require('../helpers/db-validators');
const { validateJWT, validateFields } = require('../middlewares');

const router = Router();

router.get('/', [
    validateJWT
], getContacts);

// router.get('/:id', [], getContactById);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('gender').custom(genderValidation),
    check('phone', 'Phone is not valid').optional().isLength({ min: 10 }),
    check('birthday', 'Birthday format is not valid').optional().isDate(),
    validateFields
], postContact);

// router.put('/:id', [], putContact);

// router.delete(':id', [], deleteContact);


module.exports = router;