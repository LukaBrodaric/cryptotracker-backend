const express = require('express');
const router = express.Router();
const User = require('../models/user');

// get list of users
router.get('/user', function(req, res){
res.send({type: 'GET'})
});

// reg user
router.post('/user', function(req, res) {
    User.create(req.body)
      .then(function(user) {
        res.send(user);
      })
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
  });
  

//update user?
router.put('/user/:id', function(req, res){
    res.send({type: 'PUT'})
});

router.delete('/user/:id', function(req, res){
    res.send({type: 'DELETE'})
});

module.exports = router;