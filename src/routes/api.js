const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const CryptoData = require('../models/cryptodata');

router.get('/getCryptoData', async (req, res) => {
  const { useremail } = req.query;

  try {
    const cryptoData = await CryptoData.findOne({ useremail }).exec();

    if (!cryptoData) {
      return res.status(404).json({ message: 'Cryptocurrency data not found' });
    }

    return res.status(200).json(cryptoData);
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return res.status(500).json({ message: 'Error fetching cryptocurrency data' });
  }
});

// Update cryptocurrency values for a specific user
router.post('/updateCryptoValues', function (req, res, next) {
  const { useremail, btc, ethereum, ripple, litecoin, bitcoinDash } = req.body;

  // Find the user's cryptocurrency data in the CryptoData collection
  CryptoData.findOneAndUpdate(
    { useremail },
    { btc, ethereum, ripple, litecoin, bitcoinDash },
    { new: true, upsert: true } // Create a new document if it doesn't exist
  )
    .then(function (cryptoData) {
      res.status(200).json({ message: 'Cryptocurrency values updated successfully', cryptoData });
    })
    .catch(function (error) {
      next(error);
    });
});

// Configure multer for handling file uploads
const upload = multer({
  dest: './src/userImages', // Directory where uploaded images will be stored temporarily
});

router.get('/profilePictures/:filename', function (req, res, next) {
  const filename = req.params.filename;
  const profilePicturePath = path.join(__dirname, `../userImages/${filename}`);
  res.sendFile(profilePicturePath);
});

// Define a route to handle profile picture upload
router.post('/uploadProfilePicture', upload.single('image'), function (req, res, next) {
  const userEmail = req.body.useremail;
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, `../userImages/${userEmail}.jpg`);

  fs.rename(tempPath, targetPath, function (err) {
    if (err) {
      console.error('Error moving uploaded image:', err);
      res.status(500).json({ message: 'Failed to save profile picture' });
    } else {
      // Return the filename of the saved image in the response
      res.status(200).json({ message: 'Profile picture saved successfully', filename: `${userEmail}.jpg` });
    }
  });
});


router.post('/updateUserCurrency', async function(req, res, next) {
  const { email, usercurrency, usercurrencyfull } = req.body;

  console.log('Request Body:', req.body);

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's currency information
    user.usercurrency = usercurrency;
    user.usercurrencyfull = usercurrencyfull;
    await user.save();

    console.log('User updated:', user);
    return res.status(200).json({ message: 'User currency updated successfully' });
  } catch (error) {
    console.error('Error updating currency:', error);
    return res.status(500).json({ message: 'Error updating user currency' });
  }
});


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

router.get('/userss', function(req, res, next) {
  const email = req.query.email;
  const password = req.query.password;

  if (email && password) {
    User.findOne({ email, password })
      .then(function(user) {
        if (user) {
          const { username, useremail, userpassword, usercurrency, usercurrencyfull, admin } = user;
          const credentials = {
            username,
            useremail,
            userpassword,
            usercurrency,
            usercurrencyfull,
            admin
          };
          res.send(credentials);
        } else {
          res.status(404).send('User not found');
        }
      })
      .catch(function(error) {
        next(error);
      });
  } else {
    res.status(400).send('Invalid parameters');
  }
});



//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }).exec();

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // If the user exists and the credentials are correct, return the user details
    return res.status(200).json({ message: `SUCCESSFULLY LOGGED IN, ${user.username}!!!`})
    ret
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// reg user
router.post('/user', async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    // Create cryptodata entry for the user
    const cryptodata = new CryptoData({
      useremail: user.email, // Assuming email is a field in the user model
    });

    await cryptodata.save();

    res.send(user);
    console.log("User created!");

  } catch (error) {
    next(error);
  }
});
  
router.put('/updateUserNotification', async function (req, res, next) {
  const { email, notification } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's notification attribute
    user.notifications = notification;
    await user.save();

    console.log('User updated:', user);
    return res.status(200).json({ message: 'User notification updated successfully' });
  } catch (error) {
    console.error('Error updating notification:', error);
    return res.status(500).json({ message: 'Error updating user notification' });
  }
});

//update user
router.put('/user/:id', function(req, res, next){
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      User.findOne({_id: req.params.id}).then(function(user){
        res.send(user)
      });
    });
});

router.delete('/user/:id', function(req, res, next){
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
      res.send(user);
    });
});

module.exports = router;