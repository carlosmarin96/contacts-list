const { Router } = require('express');
const { check } = require('express-validator');

const { postContact, getContacts, getContactById, putContact, deleteContact } = require('../controllers/contacts.controllers');
const { genderValidation, contactExist, validateUser } = require('../helpers/db-validators');
const { validateJWT, validateFields } = require('../middlewares');

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
], getContacts);

router.get('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(contactExist),
    check('id').custom(validateUser),
    validateFields
], getContactById);

router.post('/', [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('gender').custom(genderValidation),
    check('phone', 'Phone is not valid').optional().isLength({ min: 10 }),
    check('birthday', 'Birthday format is not valid').optional().isDate(),
    validateFields
], postContact);

router.put('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(contactExist),
    check('id').custom(validateUser),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('gender').custom(genderValidation),
    check('phone', 'Phone is not valid').optional().isLength({ min: 10 }),
    check('birthday', 'Birthday format is not valid').optional().isDate(),
    validateFields
], putContact);

router.delete('/:id', [
    validateJWT,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(contactExist),
    check('id').custom(validateUser),
    validateFields
], deleteContact);


module.exports = router;