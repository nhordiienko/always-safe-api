const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Algorithm = require('../models/algorithm');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.algoritms_get_all = (req, res, next) => {
  Algorithm.find()
  .populate('adminId', 'name')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      algoritms: docs.map(doc => {
        return {
            id: doc._id,
            text: doc.text,
            adminId: doc.adminId,
            request: {
              type: 'GET',
              url: "http://localhost:3000/algoritms/" + doc._id
            }
        }
      })
    }
    //check if there are algorithms
    if(docs.length > 0) {
      res.status(200).json(response);
    }
    else {
      res.status(200).json({
        message: "No algorithms found"
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.add_algo = (req, res, next) => {
  Admin.find({_id:req.body.adminId})
  .exec()
  .then(admin => {
    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found'
      });
    }
    else {
      const algorithm = new Algorithm({
        _id: mongoose.Types.ObjectId(),
        text: req.body.text,
        adminId: req.body.adminId
      });
      algorithm.save()
      .then(result => {
        console.log(result);
        return res.status(201).json(result);
        })
      .catch(err => {
        console.log(err);
        return res.status(500).json({
          message: 'Admin is not valid',
          error: err
        });
      });
    }
  })
}

exports.get_algo = (req, res, next) => {
  const id = req.params.algorithmId;
  Algorithm.findById(id)
  .exec()
  .then(doc => {
  console.log("From database", doc);
  if(doc) {
    res.status(200).json({
      algoritm: doc,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/algorithms'
      }
    });
  }
  else {
    res.status(404).json({message:"No such algorithm found"});
  }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

exports.patch_algo = (req, res, next) => {
  const id = req.params.algorithmId;
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops] = req.body[ops];
  }
  Algorithm.update({_id: id}, {$set: updateOps})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Algorithm updated",
      request: {
        type: 'GET',
        url: 'http://localhost:3000/algorithms/' + id
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.delete_algo = (req, res, next) => {
  Algorithm.remove({_id: req.params.algorithmId})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Algorithm deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/algorithms/',
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}
