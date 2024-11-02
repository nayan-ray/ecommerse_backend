const { productSeedHandler } = require('../controllers/productSeedControllers');

const productSeedRouter = require('express').Router();


productSeedRouter.get("/products", productSeedHandler )



module.exports  = productSeedRouter;
