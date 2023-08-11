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
    },
    usercurrency:{
        type: String,
        required:false,
        default: 'USD'
    },
    usercurrencyfull:{
        type: String,
        required:false,
        default: 'US Dollar'
    },
    notifications:{
        type: Boolean,
        required:false,
        default: false
    },
})

const User = mongoose.model('user', userSchema);

module.exports = User;