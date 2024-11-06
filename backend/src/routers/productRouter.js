const { crateProductHandler, readSingleProductHandler, deleteSingleProductHandler } = require("../controllers/productController");
const productUpload = require("../middleware/productfileUpl");

const productRouter = require("express").Router();



productRouter.post("/", productUpload.single('productImg'), crateProductHandler);
productRouter.get("/:slug", readSingleProductHandler);
productRouter.delete("/:slug", deleteSingleProductHandler);


module.exports  = productRouter;
