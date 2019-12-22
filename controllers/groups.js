const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Group = require('../models/group');
const Algorithm = require('../models/algorithm');

exports.groups_get_all = (req, res, next) => {
  Group.find()
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      groups: docs.map(doc => {
        return {
          id: doc._id,
          name: doc.name,
          algorithm: doc.algorithmId
      }
    })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}
