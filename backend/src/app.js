const express  = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const createError = require('http-errors');
const rateLimit = require("express-rate-limit");
const { userRouter } = require('./routers/userRouters');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseControllers');
const authRouter = require('./routers/authRouter');
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routers/categoryRouter');
const productSeedRouter = require('./routers/productSeedRouter');
const productRouter = require('./routers/productRouter');
const path = require('path'); 


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 5, // Limit each IP to 05requests per `window`.
	message :"to many requested from this ip"
	
});
app.use(cors())
app.use(cookieParser());
app.use(limiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//image url
app.use("/images", express.static("Public/images/usersImages"))

//api

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use("/api/auth", authRouter);
app.use("/api/category",  categoryRouter);
app.use("/api/products/seed", productSeedRouter);
app.use("/api/products", productRouter);



//client error handling
app.use((req,res,next)=>{
     next(createError(404,"router not found"))
    })

//server error handling
app.use((error,req,res,next)=>{
    
    return errorResponse(res,{
        statusCode :error.status,
        message : error.message,
    })
 })
module.exports =  app;
