const {TOKEN_SECRET} = require('./utils');
const jsonwebtoken = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied!');

    try{
        const verified = jsonwebtoken.verify(token, TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(error){
        res.status(400).send('Invalid token!');
    }
}

module.exports = verifyToken;