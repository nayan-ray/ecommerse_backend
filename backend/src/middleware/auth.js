const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { secret_login_Key } = require('../secret');


const isLoggedIn = async(req, res,  next) => {
    try {

        //taken token from cookies

        const accessToken = req.cookies.access_token;

        //check if token is valid
        if (!accessToken) {
            throw createError(401,  'Unauthorized, you are not logged in');
        }
        //verify token

        const  decoded = jwt.verify(accessToken, secret_login_Key);
        // check if user is active


        if(!decoded){
            throw createError(401, 'Unauthorized, please login first');
        }
       
        //set user in req object

        req.body.user  = decoded.user;
        // next middleware
        next();
    } catch (error) {
        next(error)
    }
    
}

const isLoggedOut = async(req , res,  next) => {
    try {
        // taken token from cookies
        const accessToken = req.cookies.access_token;
        // check if token is valid
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
    // finally next middleware
        next();
    } catch (error) {
        next(error)
    }
}

const isAdmin = async(req, res,  next) => {
    try {
        //accept token  from cookie

        const accessToken = req.cookies.access_token;

        //check  if token is valid

        if (!accessToken) {
            throw createError(401,  'Unauthorized, you are not logged in');
        }
        //decoded  token to get user

        const  decoded = jwt.verify(accessToken, secret_login_Key);
        //check decoded 
        if(!decoded){
            throw createError(401, 'Unauthorized, please login first');
        }
        //check if user is admin

        if(!decoded.user.isAdmin){
            throw createError(403, 'Forbidden, you are not an admin')
        }
        
        //finally next middleware
        next();
    } catch (error) {
        next(error)
    }
    
}

module.exports = {isLoggedIn,  isLoggedOut, isAdmin};
