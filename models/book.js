const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    publishedYear : {
        type : Number,
        required : true
    },
    avaliableCopies : {
        type : Number,
        required : true
    },
    _id : {
        type : Number
    }

})

const bookModel = mongoose.model('books' , bookSchema);

module.exports = bookModel;