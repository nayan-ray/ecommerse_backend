const  mongoose = require("mongoose");

const createError = require('http-errors');


const findProductBySlug = async  (slug, Model, options={}) => {

      try {
       
        const  product = await Model.findOne({slug}).populate('category');
                       
        if(!product) {
            throw createError(404, `${Model.modelName} not found with this id`);
        };

        return product;

      } catch (error) {

        if(error instanceof mongoose.Error.CastError){

          throw createError(400,  'Invalid product id'); 
                 
         }

       throw error;
   }


}

module.exports = {findProductBySlug}