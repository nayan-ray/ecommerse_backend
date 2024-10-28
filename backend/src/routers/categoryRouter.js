const { createCategoryHandler, getCategoryBySlugHandler, getAllCategoryHandler, deleteCategoryBySlugHandler, } = require('../controllers/categoryControllers');

const categoryRouter =  require('express').Router();

categoryRouter.post("/", createCategoryHandler);
categoryRouter.get("/:slug",  getCategoryBySlugHandler);
categoryRouter.get("/", getAllCategoryHandler)
categoryRouter.delete("/:slug", deleteCategoryBySlugHandler)


module.exports  = categoryRouter;
