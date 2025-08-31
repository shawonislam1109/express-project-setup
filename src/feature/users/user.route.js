const express = require('express');
const userController = require('./user.controller');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);

module.exports = router;
