const jwt = require('jsonwebtoken');
 //creating token
const createToken = (payload, secretKey, expiresIn)=>{
   
   if(typeof  payload !== 'object'  || payload === null){
       throw  new Error('payload must be an object');

   }

   if(typeof  secretKey !== 'string' || secretKey === '' ){

      throw new Error('secretKey must be a string');
   }

   try {

      const token = jwt.sign(payload, secretKey,{
         expiresIn
      });
      return token;
      
   } catch (error) {
       throw error;
   }
}

module.exports =  createToken;