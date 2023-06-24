const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// inicijalizacija ruta
app.use('/api',require('./routes/api'));

//error handling
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message});
});

/*
app.post('/register', (req, res) =>{
  res.send({
    message: `HI ${req.body.email}! Your user was registered`
  })
})*/

app.listen(8000, () =>{
    console.log("Server running");
})

 mongoose.connect('mongodb+srv://cryptoacc:cryptotracker123@cryptotrackercluster.dovka9d.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Cryptotracker',
});
 mongoose.Promise = global.Promise;