const authorModel = require('../models/author');

const PRE_ID = 10000;
async function genrateID(){
  try{
    const count = await authorModel.countDocuments();
    return PRE_ID + count + 5;
  }catch(err){
    throw(err)
  }
}


async function addAuthorToDB(book){
    try{
        const bookObj = new authorModel(book);
        bookObj._id = await genrateID()
        const dbResponse = await authorModel.create(bookObj);
        return dbResponse;

    }catch(error){
        throw error
    }
}


async function getAllAuthorFromDB(){
    try{
        const dbResponse = await authorModel.find({});
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function getAuthorByIDFromDB(id){
    try{
        const dbResponse = await authorModel.findById(id);
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function updateAuthorInDB(id , book){
    try{
        const bookObj = new authorModel(book);
        const dbResponse = await authorModel.findByIdAndUpdate({ _id : id } , bookObj , { new : true });
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function deleteAuthorFromDB(id ){
    try{
        const dbResponse = await authorModel.deleteOne({ _id : id });
        return dbResponse;
    }catch(error){
        throw error
    }
}



module.exports = {
    addAuthorToDB , getAllAuthorFromDB , getAuthorByIDFromDB , updateAuthorInDB , deleteAuthorFromDB
}