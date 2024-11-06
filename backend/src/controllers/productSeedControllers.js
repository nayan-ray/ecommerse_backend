const Product = require("../models/productModel");
const data = require("../seed");
const { successResponse } = require("./responseControllers");

const productSeedHandler = async (req, res, next)=>{
   try {
      //delete all existing  products
      await Product.deleteMany({});
      //insert products
      const products = await Product.insertMany(data.products);
      return successResponse(res, {
        message: "products seeded successfully",
        payload : {
            products
        }
      })

   } catch (error) {
      next(error)
   }

} 

module.exports = { productSeedHandler};
