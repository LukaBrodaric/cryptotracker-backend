const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user schema and model
const userSchema = new Schema({
    username:{
        type: String,
        required:false,
        default: 'User'
    },
    email:{
        type: String,
        required:[true, 'Email is required!'],
        unique: [true, 'Duplicate email']
    },
    password:{
        type: String,
        required:[true, 'Password is required!']
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;