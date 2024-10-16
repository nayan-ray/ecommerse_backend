const express  = require('express');
const { getUsers, getUserById, deleteUserById, userRegister, activeUserProcess, updateUser, BanUser, UnBanUser } = require('../controllers/userControllers');
const upload = require('../middleware/fileUpload');
const { isLoggedIn, isAdmin } = require('../middleware/auth');



const userRouter =  express.Router();

 

userRouter.get("/", isLoggedIn, isAdmin, getUsers )
userRouter.get("/:id", getUserById)
userRouter.delete("/:id",  deleteUserById)
userRouter.post("/process-register", upload.single('userImage') , userRegister)  

userRouter.post("/verify", activeUserProcess)
userRouter.put("/:id" , upload.single('userImage') , updateUser)
//ban user router
userRouter.put("/ban-user/:id",  isLoggedIn, isAdmin, BanUser)
//un-ban user router
userRouter.put("/un-ban-user/:id",  isLoggedIn, isAdmin, UnBanUser)



module.exports = {userRouter}
