const {Schema, model} =  require('mongoose');
const bcrypt = require('bcryptjs');
const { raw } = require('express');

const userSchema =  new Schema({
    name: {
        type: String, 
        required: [true ,  'Name is required'],
        trim: true,
        maxLength: [50, 'Name must be less than 50 characters'],
        minLength: [3, 'Name must be more than 3 characters'],
    },
    email: {
        type: String, 
        required: [true ,  'Email is required'],
        trim: true,
        lowercase : true,
        unique: true,
        validate : {
            validator : function(email) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
                },
                message : 'Please enter a valid email',
        }
    },

    password : {
        type: String, 
        required: [true ,  'Password is required'],
        trim: true,
        minLength: [6, 'Password must be more than 6 characters'],
        set :(p)=>{
            return bcrypt.hashSync(p, bcrypt.genSaltSync(10)); 
        }
    },
    image : {
        type: String,
        default : '',
        // type: Buffer,
        // contentType : String,
        // required  : [true , 'Phone number is required'],

    },
    phone : {
        type: String,
        required :  [true , 'Phone number is required'],

    },
    address : {
        type: String,
        required : [true ,  'Address is required'],

    },
    isAdmin : {
        type : Boolean ,
        default : false
    },
    isBanned : {
        type : Boolean ,
        default : false
    }
},

 {timestamps : true}


);

const  User = model('User', userSchema);
module.exports =  User;
