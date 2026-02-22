const jsonwebtoken = require('jsonwebtoken')



async function generateJWT(user){
    try{
        const jwt = jsonwebtoken.sign(user , process.env.JWT_SECRET_KEY , {
            expiresIn: '3h'
        })
        return jwt;
    }catch(error){
        thorw(error)
    }
}


async function validateToken(token){
    try{
        var decoded = jsonwebtoken.verify(token , process.env.JWT_SECRET_KEY);
        return decoded;
    }catch(error){
        thorw(error)
    }
}

module.exports = {
    generateJWT , validateToken
}