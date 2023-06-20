const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

// inicijalizacija ruta
app.use('/api',require('./routes/api'));

app.listen(8009, () =>{
    console.log("Server running");
})

 mongoose.connect('mongodb+srv://cryptoacc:cryptotracker123@cryptotrackercluster.dovka9d.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Cryptotracker',
});
 mongoose.Promise = global.Promise;