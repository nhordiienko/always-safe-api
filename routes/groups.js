const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const mongoose = require('mongoose');
const GroupController =  require('../controllers/groups');

//get all groups
router.get('/', GroupController.groups_get_all);

//add new group
//router.post('/', GroupController.add_group);

//get group by id
//router.get('/:groupId', GroupController.add_group);

//delete group
//router.post('/delete/:groupId', GroupController.delete_group);

module.exports = router;
