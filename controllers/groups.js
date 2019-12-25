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

exports.add_group = (req, res, next) => {
  Algorithm.find({_id:req.body.algorithmId})
  .exec()
  .then(algorithm => {
    if (!algorithm) {
      return res.status(404).json({
        message: 'Algorithm not found, group cannot be added'
      });
    }
    else {
      const group = new Group({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        algorithmId: req.body.algorithmId
      })
      group.save()
      .then(result => {
        return res.status(201).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
  })
}

exports.update_group = (req, res, next) => {
  const id = req.params.groupId;
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops] = req.body[ops];
  }
  Group.update({_id: id}, {$set: updateOps})
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Algorithm updated",
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.getById_group = (req, res, next) => {
  const id = req.params.groupId;
  Group.findById(id)
  .exec()
  .then(doc => {
    if(doc) {
      res.status(200).json({
        group: doc
      });
    }
    else {
      res.status(404).json({message:"No such group found"});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}
