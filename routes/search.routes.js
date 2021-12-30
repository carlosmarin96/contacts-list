const { Router } = require('express');
const { search } = require('../controllers/search.controllers');
const { validateJWT, validateFields } = require('../middlewares');

const router = Router();

router.get('/:term', [
    validateJWT,
    validateFields
], search);

module.exports = router;