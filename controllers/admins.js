const Admin = require('../models/admin');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.admins_get_all = (req, res, next) => {
  Admin.find()
  .select('_id name pass')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      admins: docs.map(doc => {
        return {
          id: doc._id,
          name: doc.name,
          pass: doc.pass,
          request: {
            type: 'GET',
            url: "http://localhost:3000/admins/" + doc._id
          }
        }
      })
    }
    //check if there are admins
    if(docs.length > 0) {
      res.status(200).json(response);
    }
    else {
      res.status(200).json({
        message: "No admins found"
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

exports.admins_login = (req, res, next) => {
  Admin.find({name:req.body.name})
  .exec()
  .then(admin => {
    if (admin.length < 1) {
      return res.status(401).json({
        message: "Auth failed 0"
      });
    }
    bcrypt.compare(req.body.pass, admin[0].pass, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed 2'
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            name: admin[0].name,
            adminId: admin[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
        );
        return res.status(200).json({
          message: 'Auth successful',
          token: token,
          id: admin[0]._id
        });
      }
        return res.status(401).json({
        message: 'Auth failed 3'
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}

exports.admins_signup = (req, res, next) => {
  Admin.find({name: req.body.name})
  .exec()
  .then(admin => {
    if(admin.length >= 1) {
      return res.status(409).json({
        message: "Admin already exists"
      });
    } else {
      bcrypt.hash(req.body.pass, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const admin = new Admin({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            pass: hash
          });
        admin.save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Admin created successfully",
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          })
        });
        }
      });
    }
  })
}


exports.get_admin = (req, res, next) => {
  const id = req.params.adminId;
  Admin.findById(id)
  .exec()
  .then(doc => {
  console.log("From database", doc);
  if(doc) {
    res.status(200).json(doc);
  }
  else {
    res.status(404).json({message:"No such admin found"});
  }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
    });
}

exports.patch_admin = (req, res, next) => {
  const id = req.params.adminId;
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops] = req.body[ops];
  }
  Admin.update({_id: id}, {$set: updateOps})
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.delete_admin = (req, res, next) => {
  const id = req.params.adminId;
  Admin.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}
