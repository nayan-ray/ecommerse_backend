const { default: slugify } = require("slugify");
const Product = require("../models/productModel");
const { findProductBySlug } = require("../services/findProduct");
const { successResponse } = require("./responseControllers");
const Category = require("../models/categoryModel");


const crateProductHandler =async(req, res, next)=>{
    try {
        const {name,  price, description, category, quantity,sold, shipping} = req.body;
        let image = null;
        if(req.file){
           image = req.file.path
        }
        const newProduct = {
            name, slug : slugify(name),  price, description, category, quantity,sold, shipping,image
        }
        const  product = await Product.create(newProduct);
        if(!product){
            throw  new Error("Failed to create product")
        }

        return successResponse(res,{
            statusCode  : 201,
            message  : 'product created successfully',
            payload : {
                product
            }
        })

        
    } catch (error) {
        next(error)
    }
}

const readSingleProductHandler =async(req, res, next)=>{
    try {
        const {slug} =  req.params;
        
        const product =  await findProductBySlug(slug,  Product);

        
        
        if(!product){
            throw  new Error("Failed to read product")
        }

        return successResponse(res,{
            message  : 'product read successfully',

            payload : {
               product
            }
        })

        
    } catch (error) {
        
        next(error)
    }
}


const deleteSingleProductHandler =async(req, res, next)=>{
    try {
        const {slug} =  req.params;
        
        await findProductBySlug(slug,  Product);

        const product  = await Product.deleteOne({slug})
        
        if(!product){
            throw  new Error("Failed to deleted product")
        }

        return successResponse(res,{
            message  : 'product deleted successfully',

            payload : {
               product
            }
        })

        
    } catch (error) {
        
        next(error)
    }
}

module.exports = {crateProductHandler,  readSingleProductHandler, deleteSingleProductHandler};