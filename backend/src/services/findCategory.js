const  mongoose = require("mongoose");
const createError = require('http-errors');


const findCategoryBySlug = async  (slug, Model) => {

      try {
        const category = await Model.findOne({slug}).select('name slug').lean();
        // check   if category found
 
        if(!category){
           throw createError( 400, "Failed to get category with this slug");
        }

        
        return category;

      } catch (error) {

        if(error instanceof mongoose.Error.CastError){

          throw createError(400,  'Invalid user id'); 
                 
         }

       throw error;
   }


}

module.exports = {findCategoryBySlug}