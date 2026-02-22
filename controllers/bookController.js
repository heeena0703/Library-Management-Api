const {  addBookToDB , getAllBookFromDB , getBookByIDFromDB , updateBookInDB , deleteBookFromDB  } = require('../utillity/book-utiltiy')
const ErrorConstants = require('../utillity/error-contstant')

async function addBook(req, resp , next){
    try{
        const response = await addBookToDB(req.body);
        if(response){
            resp.status(201).json({
                "message" :  ErrorConstants.BOOK_ADDED_SUCCESSFULLY,
                "Book Name" : response.title,
                "Book ID" : response._id
            })
        }
    }catch(error){
       next(error)
    }
}

async function getAllBooks(req, resp , next){
    try{
        const response = await getAllBookFromDB();
        if(response && Object.keys(response).length > 0){
            resp.status(200).json({
                books : response
            })
        }else{
            resp.status(200).json({
                books : ErrorConstants.BOOK_NOT_FOUND
            })
        }
    }catch(error){
        next(error)
    }
}

async function getBookById(req, resp , next){
   try{
        const response = await getBookByIDFromDB(req.params.id);
        if(response && Object.keys(response).length > 0){
            resp.status(200).json({
                books : response
            })
        }else{
            resp.status(200).json({
                books : ErrorConstants.BOOK_NOT_FOUND
            })
        }
    }catch(error){
       next(error)
    }
}

async function updateBook(req, resp , next){
    try{
        const response = await updateBookInDB(req.params.id,req.body);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" : ErrorConstants.BOOK_UPDATED_SUCCESSFULLY ,
                "Book Name" : response.title,
                "Book ID" : response._id
            })
        }
    }catch(error){
        next(error)
    }
}


async function deleteBook(req, resp , next){
    try{
        const response = await deleteBookFromDB(req.params.id);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" : ErrorConstants.BOOK_DELETED_SUCCESSFULLY ,
                "Book Name" : response.title,
                "Book ID" : response._id
            })
        }
    }catch(error){
        next(error)
    }
}

module.exports = {
    addBook , getAllBooks , getBookById , updateBook , deleteBook
}



