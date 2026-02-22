const {  addAuthorToDB , getAllAuthorFromDB , getAuthorByIDFromDB , updateAuthorInDB , deleteAuthorFromDB  } = require('../utillity/author-utility');
const ErrorConstants = require('../utillity/error-contstant')

async function addAuthor(req, resp, next){
    try{
        const response = await addAuthorToDB(req.body);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" : ErrorConstants.AUTHOR_ADDED_SUCCESSFULLY ,
                "Author Name" : response.title,
                "Author ID" : response._id
            })
        }
    }catch(error){
        next(error)
    }
}

async function getAllAuthors(req, resp , next){
    try{
        const response = await getAllAuthorFromDB();
        if(response && Object.keys(response).length > 0){
            resp.status(200).json({
                Author : response
            })
        }else{
            resp.status(200).json({
                Author : ErrorConstants.AUTHOR_NOT_FOUND
            })
        }
    }catch(error){
        next(error)
    }
}

async function getAuthorById(req, resp, next){
   try{
        const response = await getAuthorByIDFromDB(req.params.id);
        if(response && Object.keys(response).length > 0){
            resp.status(200).json({
                Author : response
            })
        }else{
            resp.status(200).json({
                Author : ErrorConstants.AUTHOR_NOT_FOUND
            })
        }
    }catch(error){
         next(error)
    }
}

async function udpateAuthor(req, resp , next){
    try{
        const response = await updateAuthorInDB(req.params.id,req.body);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" : ErrorConstants.AUTHOR_UPDATED_SUCCESSFULLY ,
                "Author Name" : response.title,
                "Author ID" : response._id
            })
        }
    }catch(error){
        next(error)
    }
}


async function deleteAuthor(req, resp , next){
    try{
        const response = await deleteAuthorFromDB(req.params.id);
        if(response && Object.keys(response).length > 0){
            resp.status(201).json({
                "message" :  ErrorConstants.AUTHOR_DELETED_SUCCESSFULLY,
                "Author Name" : response.title,
                "Author ID" : response._id
            })
        }
    }catch(error){
        next(error)
    }
}

module.exports = {
    addAuthor , getAllAuthors , getAuthorById , udpateAuthor , deleteAuthor
}



