import express from 'express';
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://cryptoacc:cryptotracker123@cryptotrackercluster.dovka9d.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
const app = express();

// Import required dependencies and middlewares
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User');

// Middleware to parse request body
app.use(express.json());

// Define the login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate the request data
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, '0955476656');

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.get('/hello', (req, res)=>{
    res.send('Hello!');
});

app.listen(8000, ()=>{
    console.log('Server listening on port 8000');
});