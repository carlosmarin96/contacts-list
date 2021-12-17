const { Router } = require('express');
const { check } = require('express-validator');

const { postUser, putUser, deleteUser } = require('../controllers/users.controllers');

const router = Router();

router.post('/', [
    check('email', 'Email is not valid').isEmail(),
], postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
