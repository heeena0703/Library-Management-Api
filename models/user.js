const mongoose = require('mongoose');

const userSchma = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    userCreatedAt : {
        type : Date,
        required : true
    }
})

const userModel = mongoose.model('users', userSchma);

module.exports = userModel;