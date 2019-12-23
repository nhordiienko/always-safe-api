const User = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.users_get_all = (req, res, next) => {
  User.find()
  .select('_id userName email age placeOfBirth curLocation')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      users: docs.map(doc => {
        return {
            id: doc._id,
            userName: doc.userName,
            email: doc.email,
            password: doc.pass,
            age: doc.age,
            placeOfBirth: doc.placeOfBirth,
            latitude: doc.latitude,
            longitude: doc.longitude,
            request: {
              type: 'GET',
              url: "http://localhost:3000/users/" + doc._id
            }
        }
      })
    }
    //check if there are users
    if(docs.length > 0) {
      res.status(200).json(response);
    }
    else {
      res.status(200).json({
        message: "No users found"
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

exports.users_login = (req, res, next) =>  {
  User.find({email:req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: 'Auth failed 1'
      });
    }
    bcrypt.compare(req.body.pass, user[0].pass, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed 2'
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h"
          }
       );
        return res.status(200).json({
          message: 'Auth successful',
          token: token
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

exports.users_signup = (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if(user.length >= 1) {
      return res.status(409).json({
        message: "Email exists"
      });
    } else {
      bcrypt.hash(req.body.pass, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
              error: err
            });
        } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              userName: req.body.userName,
              email: req.body.email,
              pass: hash,
              age: req.body.age,
              placeOfBirth: req.body.placeOfBirth,
              latitude: req.query.latitude,
              longitude: req.query.longitude
            });
          user.save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "User created successfully",
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
  });
}

exports.get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
  .select('_id userName age curLocation')
  .exec()
  .then(doc => {
  console.log("From database", doc);
  if(doc) {
    res.status(200).json({
      user: doc,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/users'
      }
    });
  }
  else {
    res.status(404).json({message:"No such user found"});
  }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
}

exports.patch_user = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops] = req.body[ops];
  }
  User.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User updated",
        request: {
          type: 'GET',
          url: 'http://localhost:3000/users/' + id
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

exports.delete_user = (req, res, next) => {
  const id = req.params.userId;
  User.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'User deleted',
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}
