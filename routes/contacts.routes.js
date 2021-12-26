const { Router } = require('express');
const { check } = require('express-validator');

const { postContact, getContacts } = require('../controllers/contacts.controllers');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', [], getContacts);

// router.get('/:id', [], getContactById);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('phone', 'Phone is not valid').optional().isLength({ min: 10 }),
    check('birthday', 'Birthday format is not valid').optional().isDate(),
    check('createdBy', 'Id is not valid').isMongoId(),
    validateFields
], postContact);

// router.put('/:id', [], putContact);

// router.delete(':id', [], deleteContact);


module.exports = router;