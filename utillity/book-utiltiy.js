const bookModel = require('../models/book');

const PRE_ID = 10000;
async function genrateID(){
  try{
    const count = await bookModel.countDocuments();
    return PRE_ID + count + 5;
  }catch(err){
    throw(err)
  }
}


async function addBookToDB(book){
    try{
        const bookObj = new bookModel(book);
        bookObj._id = await genrateID()
        const dbResponse = await bookModel.create(bookObj);
        return dbResponse;

    }catch(error){
        throw error
    }
}


async function getAllBookFromDB(){
    try{
        const dbResponse = await bookModel.find({});
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function getBookByIDFromDB(id){
    try{
        const dbResponse = await bookModel.findById(id);
        return dbResponse;
    }catch(error){
        throw error
    }
}

async function updateBookInDB(id , book){
    try{
        const bookObj = new bookModel(book);
        const dbResponse = await bookModel.findByIdAndUpdate({ _id : id } , bookObj , { new : true });
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function deleteBookFromDB(id ){
    try{
        const dbResponse = await bookModel.deleteOne({ _id : id });
        return dbResponse;
    }catch(error){
        throw error
    }
}



module.exports = {
    addBookToDB , getAllBookFromDB , getBookByIDFromDB , updateBookInDB , deleteBookFromDB
}