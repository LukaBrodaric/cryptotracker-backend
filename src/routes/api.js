const express = require('express');
const router = express.Router();

// get list of users
router.get('/user', function(req, res){
res.send({type: 'GET'})
});

// reg user
router.post('/user', function(req, res){
    console.log(req.body);
    res.send({
        type: 'POST',
        username:req.body.username,
        email:req.body.email
    })
});

//update user?
router.put('/user/:id', function(req, res){
    res.send({type: 'PUT'})
});

router.delete('/user/:id', function(req, res){
    res.send({type: 'DELETE'})
});

module.exports = router;