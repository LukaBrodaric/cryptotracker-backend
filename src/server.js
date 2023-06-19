const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const database = module.exports = () =>{
}

database();


app.use(bodyParser.json());

// inicijalizacija ruta
app.use('/api',require('./routes/api'));

app.listen(8009, () =>{
    console.log("Server running");
})
  
  async function connectToMongoDB() {
    try {
      const uri = 'mongodb+srv://cryptoacc:cryptotracker123@cryptotrackercluster.dovka9d.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
      const client = new MongoClient(uri);
      await client.connect();
  
      const db = client.db('Cryptotracker');
      const collection = db.collection('User');
  
      // Now you can perform operations on the "User" collection
      // For example:
      const users = await collection.find().toArray();
      console.log(users);
  
      // Remember to close the connection when you're done
      await client.close();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  connectToMongoDB();
