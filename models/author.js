const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name : {
        type : String,
        required  : true
    },
    bio : {
        type :String ,
        requred : true
    },
    dateOfBirth : {
        type : String,
        required : true
    },
    _id : {
        type : Number,
        required : true
    }
})


const authorModel = mongoose.model('authors' , authorSchema);

module.exports = authorModel;