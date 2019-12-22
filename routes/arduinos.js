const express = require('express');
const router = express.Router();
const Arduino = require('../models/arduino');
const mongoose = require('mongoose');
const ArduinoController =  require('../controllers/arduino');

router.get('/', ArduinoController.arduino_get_all);

router.post('/', ArduinoController.arduino_add);

router.put('/:arduinoId', ArduinoController.arduino_update);

router.get('/getByLoc', ArduinoController.get_by_location);

module.exports = router;
