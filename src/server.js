const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: 'https://cryptotracker-frontend-ozkc.vercel.app',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
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

app.listen(process.env.PORT || 8000, () => {
  console.log("Server running");
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Cryptotracker',
});
 mongoose.Promise = global.Promise;