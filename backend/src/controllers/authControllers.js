const User = require("../models/userModel");
const { successResponse } = require("./responseControllers");
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = require("../helper/jsonwebtoken");
const { secret_login_Key } = require("../secret");


const handleLogin =  async(req, res, next)=>{
    try {
        //taken email and password from req.body

        const { email, password } = req.body;
        //find user  by email

        const user = await User.findOne({ email });
        //if user is not found send error response

        if (!user) {
            throw createError(404,  "User not found");

        }

        //compare password

        const isMatch = await bcrypt.compare(password, user.password);

        //check match 
        if (!isMatch) {

            throw createError(401, "Invalid password or email");
         
        }
        
        //check banned user

        if(user.isBanned){
            throw  createError(401, "Your account is banned.  Please contact admin");
        }
        
        // create  token
        const accessToken = createToken({user : user}, secret_login_Key, "10m" ) 
          
        //set token in cookie
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 10, // 10 minutes
            // secure: true,
            sameSite : "none"
        })
       
        return successResponse(res,{
            statusCode  : 200,
            message  : 'user login successfully',
            payload : {
                 accessToken            
            }
        })
        
    } catch (error) {
        next(error)
    }
  
}

const handleLogout =  async(req, res, next)=>{
    try {
        
        //clear  cookie
        res.clearCookie("access_token");

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user logout successfully',
            payload : {
                        
            }
        })
        
    } catch (error) {
        next(error)
    }
  
}


module.exports = {handleLogin, handleLogout}