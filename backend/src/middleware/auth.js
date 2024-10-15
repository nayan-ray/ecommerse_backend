const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { secret_login_Key } = require('../secret');


const isLoggedIn = async(req, res,  next) => {
    try {
        const accessToken = req.cookies.access_token;
        if (!accessToken) {
            throw createError(401,  'Unauthorized, you are not logged in');
        }
        const  decoded = jwt.verify(accessToken, secret_login_Key);

        if(!decoded){
            throw createError(401, 'Unauthorized, please login first');
        }
        console.log(decoded);
        
        req.body.userId  = decoded._id;

        next();
    } catch (error) {
        next(error)
    }
    
}

const isLoggedOut = async(req , res,  next) => {
    try {
        const accessToken = req.cookies.access_token;
        if (accessToken) {
            try {
                const  decoded = jwt.verify(accessToken, secret_login_Key);
                if(decoded){
                    throw createError(401, 'Unauthorized, you are already logged in');
                }
            } catch (error) {
                throw error;
            }
        }

        next();
    } catch (error) {
        next(error)
    }
}


module.exports = {isLoggedIn,  isLoggedOut};
