const { isUserAlreadyExists , addUser , userLogin } = require("../utillity/user-utility");
const ErrorConstants = require('../utillity/error-contstant')

async function register(req , res , next) {
        try {
           const isUserExist = await isUserAlreadyExists(req.body.name);
           if(isUserExist) {
                throw new Error(ErrorConstants.USER_ALREADY_EXISTS);
           }
           else{
                let response = await  addUser(req.body);
                res.status(201).json({ message: ErrorConstants.USER_ADDED_SUCCESSFULLY , response : response});
           }
       }
        catch (error) {
            next(error)
        }
}


async function login(req , res , next) {
    try {
        let response =await  userLogin(req.body.name , req.body.password);
        if(response) {
            res.status(200).json({ message: ErrorConstants.USER_LOGED_IN , response : response});
        }
        else{
            res.status(500).json({ message: ErrorConstants.INVALID_CREDENTIALS });
        }

    }catch (error) {
         next(error)
    }
}

module.exports = {register , login }