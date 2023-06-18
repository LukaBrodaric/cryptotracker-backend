const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const mongoose = require("mongoose");
const database = module.exports = () =>{
}

database();

app.listen(8009, () =>{
    console.log("Server running");
})

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
      },
  });
  
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
