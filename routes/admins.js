const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AdminsController =  require('../controllers/admins');


//get all admins
router.get('/', AdminsController.admins_get_all);

//log into account
router.post('/login', AdminsController.admins_login);

//create new admin
router.post('/signup', AdminsController.admins_signup);

//get admin by ID
router.get('/:adminId', AdminsController.get_admin);

//update admin
router.patch('/:adminId', AdminsController.patch_admin);

//delete admin
router.delete('/:adminId', AdminsController.delete_admin);

module.exports = router;
