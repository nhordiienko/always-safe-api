const express = require('express');
const router = express.Router();
const Algorithm = require('../models/algorithm');
const Admin = require('../models/admin');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const AlgController =  require('../controllers/algorithms');

//get all algorithms
router.get('/', AlgController.algoritms_get_all);

//add new algo
router.post('/', checkAuth, AlgController.add_algo);

//get alg by its ID
router.get('/:algorithmId', AlgController.get_algo);

//update algo
router.patch('/:algorithmId', AlgController.patch_algo);

//delete algo
router.delete('/:algorithmId', AlgController.delete_algo);

module.exports = router;
