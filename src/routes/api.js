const express = require('express');
const router = express.Router();
const User = require('../models/user');

// vraca listu svih usera
router.get('/users', function(req, res, next) {
  User.find({})
    .then(function(users) {
      res.send(users);
    })
    .catch(function(error) {
      next(error);
    });
});


// reg user
router.post('/user', function(req, res, next) {
    User.create(req.body)
      .then(function(user) {
        res.send(user);
      })
      .catch(next);
console.log("User created!");
  });
  

//update user (isto treba saveat cur user u store i onda zamjenit _id sa store.User.id ili store.user.email)
router.put('/user/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function(user){
        res.send(user)
      });
    });
});

//saveat current usera u store i zamjenit _id sa store.idem kojeg dobijemo iz monga ili samo izbrisat usera po mailu.
router.delete('/user/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
      res.send(user);
    });
});

module.exports = router;

/*  Duplicate entry error handler
      .catch(function(error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
          // Duplicate key error occurred
          const duplicateField = Object.keys(error.keyPattern)[0];
          const duplicateValue = error.keyValue[duplicateField];
          const errorMessage = `Duplicate ${duplicateField}: ${duplicateValue}`;
          res.status(400).send({ error: errorMessage });
        } else {
          // Other error occurred
          res.status(500).send({ error: 'An error occurred' });
        }
      });
*/