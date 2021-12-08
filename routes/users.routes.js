const {Router} = require('express');
const {postUser, putUser, deleteUser} = require('../controllers/users.controllers');

const router = Router();

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
