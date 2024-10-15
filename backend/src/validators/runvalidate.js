const {validationResult} =  require('express-validator');



const runValidation = async(req, res, next)=>{
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

       console.log(errors);
        return;        
    }
   
    next();
   } catch (error) {
       next(error)
   }
}

module.exports = runValidation;