const borrowerModel = require('../models/borrower');
const {  getBookByIDFromDB , updateBookInDB } = require('./book-utiltiy');


const PRE_ID = 70000;
async function genrateID(){
  try{
    const count = await borrowerModel.countDocuments();
    return PRE_ID + count + 5;
  }catch(err){
    throw(err)
  }
}


async function addBorrowerToDB(author){
    try{
        const authorObj = new borrowerModel(author);
        authorObj._id = await genrateID()
        const dbResponse = await borrowerModel.create(authorObj);
        return dbResponse;

    }catch(error){
        throw error
    }
}


async function getAllBorrowerFromDB(){
    try{
        const dbResponse = await borrowerModel.find({});
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function getBorrowerByIDFromDB(id){
    try{
        const dbResponse = await borrowerModel.findById(id);
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function updateBorrowerInDB(id , author){
    try{
        const authorObj = new borrowerModel(author);
        const dbResponse = await borrowerModel.findByIdAndUpdate({ _id : id } , authorObj , { new : true });
        return dbResponse;

    }catch(error){
        throw error
    }
}

async function deleteBorrowerFromDB(id ){
    try{
        const dbResponse = await borrowerModel.deleteOne({ _id : id });
        return dbResponse;
    }catch(error){
        throw error
    }
}


async function borrowBookFromDB(id, req) {
    try {
        if (await checkIfBookAvailableForBorrowing(id)) {
            let checkIfBorrowerAlreadyExsist = await borrowerModel.find({ name: req.headers['user']?.name }) || [];
            if (checkIfBorrowerAlreadyExsist.length == 0) {
                throw new Error(ErrorConstants.BORROWER_NOT_FOUND)
            }

            const borrowedBooks = checkIfBorrowerAlreadyExsist[0]?.borrowedBooks || [];
            let isBookPresent = false;
            borrowedBooks.forEach((book) => {
                if (book == id) {
                    isBookPresent = true;
                    throw new Error(ErrorConstants.BOOK_ALREADY_BORROWED);
                }
            });
            if (!isBookPresent) {
                const bookDetails = await getBookByIDFromDB(id);
                if (bookDetails != null) {
                    const bookToBeBorrowed = {
                        id: bookDetails._id,
                        bookName: bookDetails.title,
                        borrowedDate: new Date()
                    }
                    borrowedBooks.push(bookToBeBorrowed);
                }

            }
            const dbResponse = await borrowerModel.findOneAndUpdate({ name: req.headers['user']?.name }, { borrowedBooks: borrowedBooks }, { new: true });
            return dbResponse;
        } else {
            return {}
        }

    } catch (error) {
        throw error;
    }
}

async function returnBookFromDB(id, req) {
    try {
        if (await checkIfBookIsBorrowedByUser(id, req)) {
            let checkIfBorrowerAlreadyExsist = await borrowerModel.find({ name: req.headers['user']?.name }) || [];
            let borrowedBooks = checkIfBorrowerAlreadyExsist[0]?.borrowedBooks || [];
            borrowedBooks = borrowedBooks.filter(book => book.id != id);
            const dbResponse = await borrowerModel.findOneAndUpdate({ name: req.headers['user']?.name }, { borrowedBooks: borrowedBooks }, { new: true });
            return dbResponse;
        } else {
            return {}
        }

    } catch (error) {
        throw error;
    }   
}

async function checkIfBookIsBorrowedByUser(id, req) {
    try {
        let borrowerUser = await borrowerModel.find({ name: req.headers['user']?.name }) || [];
        if (borrowerUser.length == 0) {
           return false;
        }else{
            const borrowedBooks = borrowerUser[0]?.borrowedBooks || [];
            return borrowedBooks.find((book) => book.id == id);
        }
    } catch (error) {
        throw error;
    }
}


async function checkIfBookAvailableForBorrowing(id){
    const isBookAvaliable =  await getBookByIDFromDB(id);
    if(isBookAvaliable!=null && isBookAvaliable.avaliableCopies > 0){
        avaliableCopies = isBookAvaliable.avaliableCopies - 1;
        let resp = await updateBookInDB(id , { avaliableCopies : avaliableCopies } , { new : true });
        return true;
    }
    return false;
}



module.exports = {
    addBorrowerToDB , getAllBorrowerFromDB , getBorrowerByIDFromDB , updateBorrowerInDB , deleteBorrowerFromDB ,borrowBookFromDB ,returnBookFromDB
}