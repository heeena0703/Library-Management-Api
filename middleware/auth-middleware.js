const { validateToken } = require('../utillity/jwt-utility')


async function authMiddleware(req, resp , next){
    try{
        let token = req.headers['authorization'];
    if(token == undefined) {
       resp.status(401).json({ message: 'Unauthorized' });
    }else{
        token = token.split(' ')[1];
        let validate = await validateToken(token);
        req.headers['user'] = validate;
        next()
    }
    }catch(error){
        resp.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = authMiddleware;