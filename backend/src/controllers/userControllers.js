const User = require("../models/userModel");
const fs  = require("fs");
const jwt = require('jsonwebtoken');

const createError = require('http-errors');
const { successResponse } = require("./responseControllers");
const  mongoose  = require("mongoose");
const { findUserById } = require("../services/findUserById");
const { deleteImageByPath } = require("../helper/deleteImage");
const createToken = require("../helper/jsonwebtoken");
const { secretKey } = require("../secret");
const {emailWithNodeMailer} = require("../helper/email");




const getUsers = async(req, res,next) => {
    try {
        // console.log(req.body.user);
        
        const search =  req.query.search || '';
        const page =  req.query.page || 1;
        const limit = req.query.limit || 10;

        const searchRex  = new RegExp(  '.*' +  search + '.*', 'i' );
        
        const filter = {
            admin : { $ne  : true },
            $or : [
                { name : { $regex : searchRex } },
                { email : { $regex : searchRex } },
                { address :  { $regex : searchRex } },
                { phone : { $regex : searchRex } },

            ]
        }
        const options = {password : 0};

        const  users = await User.find(filter, options)
                       .limit(limit)
                       .skip((page - 1) * limit);
        if(!users) throw createError( 404, 'Users not found');
                      
        const count  = await User.countDocuments(filter);
       
       

        return successResponse(res,{
            statusCode  : 200,
            message  : 'Users retrieved successfully',
            payload : {
                users : users,
                pagination : {
                    totalPage  : Math.ceil(count / limit),
                    currentPage :  page,
                    prevPage   : page - 1 > 0  ? page - 1 : null,
                    nextPage   : page + 1 <= Math.ceil(count / limit) ? page + 1 :null
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

const getUserById = async(req, res,next) => {
    try {
        //take  id from params

        const  id = req.params.id;

        //options  to exclude password from response

        const options = {password : 0};

        //retrieve  user by id


        const user = await findUserById(id, User, options);

         //send  response with user details


        return successResponse(res,{
            statusCode  : 200,
            message  : 'user retrieved successfully',
            payload : {
                users : user,              
            }
        })
       

    } catch (error) {
        
        next(error)
    }
}

const deleteUserById= async(req, res,next) => {
    try {
        //take  id from params

        const  id = req.params.id;

        //check  if user exists


        const user = await findUserById(id,  User);
      
        //check image  exists

        const userImagePath = user.image;
        // delete  user image from server

        await  deleteImageByPath(userImagePath);

        // delete  user from database

        await User.findByIdAndDelete({_id : id, isAdmin  : false});

        // send  response with success message

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user deleted successfully',
            
        })

    } catch (error) {
        
        // send  error response with error message

        next(error)
    }
}

const userRegister= async(req, res,next) => {
    try {
        //taken user info
       const  {name, email, password, phone, address} = req.body;
       //take user image

       let image  = null;


       if(req.file){
           image = req.file.path;
       }
       //check user exist
       const userExist = await User.exists({email  : email});
       
       if(userExist){
          throw createError(409,
             "User with this email  already exist. Please sign in"
            );

        }
        
    //    if(!req.file){
    //       throw createError(409,
    //          "image is required"
    //        );
    //    }

  
        // const imageBufferString = req.file.buffer.toString('base64');

        
        



        //create newUSer object
        const newUser = {
            name, email, password, phone, address,  image

        }
        
        //create token
        
        const token = createToken(newUser, secretKey, '10m');

                //prepare email

                 const emailData = {
                    email: email,
                    subject : 'Account Activation Email',
                    text: "hello world",
                    html : `
                      <h2> Hello ${name} </h2>
                      <p>Please click here to
                         <a href='http://localhost:3000/api/user/activate/${token}'>
                          activate your account
                        </a>
                       </p>
                    `
               }
      
      
         //sendEmail
      
        //  try {
        //     await emailWithNodeMailer(emailData);
        //  } catch (error) {
        //      throw error;
        //  }

        //check req file

        console.log(req.file);
        

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user registered successfully',
            payload :{
                token
            }
        })



    } catch (error) {
        
        next(error)
    }
}

const activeUserProcess= async(req, res, next) => {
    
    try {
        //accept token and check
        const token = req.body.token;
        
         
        if(!token) {
          throw createError(404, 'token not found');
        }
      // token verify and check

        try {

            const decoded = jwt.verify(token, secretKey);
            
            if(!decoded ) {
            throw createError(404, 'unable to create user');
            }
             
             
             //user  exist or not check

              const userExist = await User.exists({email  : decoded.email});
       
              if(userExist){
                  throw createError(409,
                  "User with this email  already exist. Please sign in"
                 );

               }

              
        
           //finally save user in database
 
           const user = await User.create(decoded);
             return successResponse(res,{
            statusCode  : 200,
            message  : 'user created successfully',
            payload :{
                user
            }
        })

        } catch (error) {
             if(error.name === "TokenExpiredError"){
                throw createError(401, 'token expired');
             } else if(  error.name === "JsonWebTokenError"){

               throw createError(401, 'invalid token');
             } else if(error instanceof mongoose.Error){
                throw createError(500, 'mongoose error');
             } else{
                throw error;
             }
            
        }
   
    } catch (error) {
        console.log("hello error");
        
        console.log( error);

        console.log("hello error"); 
        next(error) ; 
    }
    
    
}

const updateUser = async(req, res,next) => {
    try {
       //accept id

        const  id = req.params.id;

      //check user with this id

        const user = await findUserById(id, User);

      //update options

       const  updateOptions = {new : true}
      
      //create update object

       let  updateObject = {};

       if(req.body.name){
          updateObject.name = req.body.name;
       }
       if(req.body.email){
          throw  createError(400, 'you can not  update email');
       }

       if(req.body.password){
          updateObject.password = req.body.password;
       }
       if(req.body.phone){
          updateObject.phone = req.body.phone;
        }

        if(req.body.address){
          updateObject.address = req.body.address;
        }

        const image  = req.file;
       
       if(image){
         
        updateObject.image = image.path;
          user.image && deleteImageByPath(user.image);
        }
      
        try {
            if(!updateObject){
                throw createError(400, 'no update object')
            }else{
                
            }
        } catch (error) {
            throw error;
        }
        console.log("hello");

      
       
        const  userUpdated = await User.findByIdAndUpdate(id,  updateObject, updateOptions);
           
       //checked  if user is updated

       if(!userUpdated){

          throw createError(404, 'Some thing went wrong');

       }
    

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user retrieved successfully',
            payload : {
                users : userUpdated,              
            }
        })

    } catch (error) {
        
        next(error)
    }
}

const BanUser = async(req, res,next) => {
    try {
       //accept id

        const  id = req.params.id;

      //check user with this id

        const user = await findUserById(id, User);

      //update options

       const  updateOptions = {new : true}
      
      //create update object
       const updateObject={
          isBanned : true
       }
 
       const  userUpdated = await User.findByIdAndUpdate(id,  updateObject, updateOptions);
           
       //checked  if user is updated

       if(!userUpdated){

          throw createError(404, 'Some thing went wrong');

       }
    

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user Banned successfully',
            payload : {
                              
            }
        })

    } catch (error) {
        
        next(error)
    }
}

const UnBanUser = async(req, res,next) => {
    try {
       //accept id

        const  id = req.params.id;

      //check user with this id

        const user = await findUserById(id, User);

      //update options

       const  updateOptions = {new : true}
      
      //create update object
       const updateObject={
          isBanned : false
       }
 
       const  userUpdated = await User.findByIdAndUpdate(id,  updateObject, updateOptions);
           
       //checked  if user is updated

       if(!userUpdated){

          throw createError(404, 'Some thing went wrong');

       }
    

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user Un-Banned successfully',
            payload : {
                              
            }
        })

    } catch (error) {
        
        next(error)
    }
}
module.exports = {getUsers,  getUserById,  deleteUserById, 
     userRegister,  activeUserProcess, updateUser, BanUser,  UnBanUser};




