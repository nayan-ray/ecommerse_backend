const mongoose = require('mongoose');
const { Mongo_connect_url } = require('../secret');


const connectDb = async ()=>{
   try {
    await  mongoose.connect(Mongo_connect_url)
    console.log("database connected successfully");
   
   } catch (error) {
      console.log(error.message);
      
   }


}

module.exports = connectDb;
