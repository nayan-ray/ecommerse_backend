const Category = require("../models/categoryModel");
const { findCategoryBySlug } = require("../services/findCategory");
const { successResponse } = require("./responseControllers")
const createError = require('http-errors');
const slugify = require('slugify');

const createCategoryHandler = async (req, res, next)=>{
     try {
        //get  category name from request body

        const {name}  = req.body;

        // create newCategory  object

        const newCategory = {
           name, slug :  slugify(name)
   
        }

        //put  newCategory  in database


        const category = await Category.create(newCategory);
        // check  if category created successfully

        if(!category){
           throw createError( 400, "Failed to create category")
        }
        //return success response with category data
        return successResponse(res,{
            statusCode  : 201,
            message  : 'category created successfully',
            payload : {
                   category        
            }
        })
     } catch (error) {
         next(error)
     }
}

const getCategoryBySlugHandler = async (req, res, next)=>{
    try {
        //take   slug from request params

       const slug =  req.params.slug;
       //find category by slug in database
        const  category = await findCategoryBySlug(slug,  Category);


       // return success response with category data

       return successResponse(res,{
           statusCode  : 200,
           message  : 'category retrieve successfully',
           payload : {
                  category        
           }
       })
    } catch (error) {
        next(error)
    }
}

const getAllCategoryHandler = async (req, res, next)=>{
    try {
        //take   slug from request params

       const slug =  req.params.slug;
       //find category by slug in database
       const categories = await Category.find({});
       // return success response with category data

       return successResponse(res,{
           statusCode  : 200,
           message  : 'category retrieve successfully',
           payload : {
                  categories       
           }
       })
    } catch (error) {
        next(error)
    }
}

const deleteCategoryBySlugHandler = async (req, res, next)=>{
    try {
        //take   slug from request params

       const slug =  req.params.slug;
       //find category by slug in database
       const category = await findCategoryBySlug(slug,   Category);
       //delete category from database
        await Category.findOneAndDelete(slug)

       // return success response with category data

       return successResponse(res,{
           statusCode  : 200,
           message  : 'category delete successfully',
           payload : {
                  category      
           }
       })
    } catch (error) {
        next(error)
    }
}
module.exports = {createCategoryHandler, getCategoryBySlugHandler,  getAllCategoryHandler, deleteCategoryBySlugHandler};
