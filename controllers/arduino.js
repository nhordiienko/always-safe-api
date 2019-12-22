const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Arduino = require('../models/arduino');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.arduino_get_all = (req, res, next) => {
  Arduino.find()
  .exec()
  .then( docs => {
    const response = {
      sensors: docs.map(doc => {
        return {
          id: doc._id,
          latitude: doc.latitude,
          longitude: doc.longitude,
          temperature: doc.temperature,
          humidity: doc.humidity,
          pressure: doc.pressure,
          O2content: doc.O2content,
          CO2content: doc.CO2content,
          infrasound: doc.infrasound
        }
      })
    }
    if (docs.length > 0 ) {
      res.status(200).json(response);
    }
    else {
      res.status(200).json({ error: "Some kind of error happened" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.arduino_add = (req, res, next) => {
  Arduino.find()
  .exec()
  .then(docs => {
    console.log(req.body);
    const arduino = new Arduino({
      _id: new mongoose.Types.ObjectId(),
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      temperature: req.body.temperature,
      humidity: req.body.humidity,
      pressure: req.body.pressure,
      O2content: req.body.O2content,
      CO2content: req.body.CO2content,
      infrasound: req.body.infrasound
    })
    arduino.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Arduino created",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
  })
}

exports.arduino_update = (req, res, next) => {
  const id = req.params.arduinoId;
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops] = req.body[ops];
  }
  Arduino.updateOne({_id: id}, {$set: updateOps})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Arduino updated",
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.get_by_location = (req, res, next) => {
  const lat = parseFloat(req.query.latitude);
  const long = parseFloat(req.query.longitude);
  const d = 3;
  Arduino.find( {latitude: {$gte: lat - d, $lte: lat + d}, longitude: {$gte: long - d, $lte: long + d}})
  .exec()
  .then(arduino => {
    if (!arduino) {
      return res.status(404).json({
        message: 'Arduino in range not found'
      });
    }
    else {
      const response = {
        sensors: arduino.map(doc => {
          return {
            id: doc._id,
            latitude: doc.latitude,
            longitude: doc.longitude,
            temperature: doc.temperature
          }
        })
      }
      res.json(response);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}
