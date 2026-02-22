const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const { generateJWT } = require('./jwt-utility');

async function isUserAlreadyExists(email) {
    try{
        let isUserExsits = await userModel.findOne({ name : email }) || [];
        if(isUserExsits.length == 0) {
            return false;
        }
        else{
            return true;
        }

    }catch (error) {
        throw error;
    }
}

async function userLogin(email , password) {
    try{
        let userDeatils = await userModel.findOne({ name : email }) || [];
        if(userDeatils.length == 0) {
            return false;
        }
        else{
            let ifPasswordMatch = await unHashPassword(password , userDeatils.password);
            if(ifPasswordMatch) {
                return convertUserDetailsToUser(userDeatils);
            }
            return false;
        }
    }catch (error) {
        throw error;
    }
}

async function convertUserDetailsToUser(user){
    let userDetails = JSON.parse(JSON.stringify(user));
    delete userDetails._id;
    delete userDetails.__v;
    delete userDetails.password;
    delete userDetails.userCreatedAt;
    userDetails.access_token = await generateJWT(userDetails);
    return userDetails;
}


async function addUser(user) {
    try{
        let userObject =  new userModel(user);
        userObject.userCreatedAt = new Date();
        userObject.password = await hashPassword(user.password);
        let response = await userModel.create(userObject);
        delete response.password;
        delete response.__v;
        delete response._id;
        return response;
    }catch (error) {
        throw error;
    }
}


async function unHashPassword(password , hashedPassword) {
    try{
      const isValidPassword =  await bcrypt.compare( password , hashedPassword);
      if(isValidPassword) {
        return true;
      }else{
        return false;
      }
    }catch(error){
        throw error;
    }
}


async function hashPassword(password) {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password , salt);
        return hashedPassword;
    }catch(error) {
        throw error;
    }
}


module.exports = {isUserAlreadyExists , addUser , hashPassword , userLogin };