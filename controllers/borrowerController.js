const {  addBorrowerToDB , getAllBorrowerFromDB , getBorrowerByIDFromDB , updateBorrowerInDB , deleteBorrowerFromDB ,borrowBookFromDB , returnBookFromDB } = require('../utillity/borrower-utility');
const ErrorConstants = require('../utillity/error-contstant')


async function addBorrower(req, resp ,next){
    try{
        const response = await addBorrowerToDB(req.body);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" : ErrorConstants.BORROWER_ADDED_SUCCESSFULLY ,
                "Borrower Name" : response.title,
                "Borrower ID" : response._id
            })
        }
    }catch(error){
        next(error)
    }
}

async function getAllBorrowers(req, resp , next){
    try{
        const response = await getAllBorrowerFromDB();
        if(response && Object.keys(response).length > 0){
            resp.status(200).json({
                "Borrower" : response
            })
        }else{
            resp.status(200).json({
                "Borrower" : ErrorConstants.BORROWER_NOT_FOUND ,
            })
        }
    }catch(error){
        next(error)
    }
}

async function getBorrowerById(req, resp , next ){
   try{
        const response = await getBorrowerByIDFromDB(req.params.id);
        if(response && Object.keys(response).length > 0){
            resp.status(200).json({
                "Borrower" : response
            })
        }else{
            resp.status(200).json({
                "Borrower" : ErrorConstants.BORROWER_NOT_FOUND 
            })
        }
    }catch(error){
        next(error)
    }
}

async function udpateBorrower(req, resp ,next){
    try{
        const response = await updateBorrowerInDB(req.params.id,req.body);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" : ErrorConstants.BORROWER_UPDATED_SUCCESSFULLY ,
                "Borrower Name" : response.title,
                "Borrower ID" : response._id
            })
        }
    }catch(error){
        next(error)
    }
}


async function deleteBorrower(req, resp , next){
    try{
        const response = await deleteBorrowerFromDB(req.params.id);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" : ErrorConstants.BORROWER_DELETED_SUCCESSFULLY ,
                "Borrower" : response
            })
        }
    }catch(error){
        next(error)
    }
}

async function borrowBook(req, resp , next){
    try {
        const response = await borrowBookFromDB(req.params.id , req);
        if (response && Object.keys(response).length > 0) {
            resp.status(201).json({
                "message": ErrorConstants.BORROWED_BOOK_SUCCESSFULLY ,
            })
        }else{
            resp.status(200).json({
                "message": ErrorConstants.BOOK_NOT_AVALIABLE_FOR_BORROWING 
            })
        }
    } catch (error) {
        next(error)
    }
}


async function returnBook(req, resp , next){
    try {
        const response = await returnBookFromDB(req.params.id , req);
        if (response && Object.keys(response).length > 0) {
            resp.status(201).json({
                "message":  ErrorConstants.BOOK_RETURN_SUCCESSFULLY 
            })
        }else{
            resp.status(200).json({
                "message": ErrorConstants.BOOK_HAVENT_BORROWED 
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addBorrower , getAllBorrowers , getBorrowerById , udpateBorrower , deleteBorrower ,returnBook , borrowBook
}



