const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersController =  require('../controllers/users');

//get all users
router.get('/', UsersController.users_get_all);

//log into user account
router.post('/login', UsersController.users_login);

//create new user
router.post('/signup', UsersController.users_signup);

//get user by id
router.get('/:userId', UsersController.get_user);

//update user
router.patch('/:userId', UsersController.patch_user);

//delete user
router.delete('/:userId', UsersController.delete_user);

module.exports = router;
