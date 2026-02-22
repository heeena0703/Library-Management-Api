const mongoose = require('mongoose');


const borrowerSchema = new mongoose.Schema({
    _id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required  : true
    },
    email : {
        type : String,
        required : true
    },
    borrowedBooks : {
        type : Array ,
        required : false
    }
})


const borrowerModel = mongoose.model('borrowers' , borrowerSchema);

module.exports = borrowerModel;