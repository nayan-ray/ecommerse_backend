const express  = require('express');
const { getUsers, getUserById, deleteUserById, userRegister, activeUserProcess, updateUser, BanUser, UnBanUser, updateUserPassword, userForgetPassword, resetUserPassword } = require('../controllers/userControllers');
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
//update password  router
userRouter.put("/update-password/:id",  isLoggedIn, updateUserPassword)
//forget  password router
userRouter.post("/forget-password",  userForgetPassword)
//password  reset router
userRouter.put("/forget-password/reset-password",  resetUserPassword)





module.exports = {userRouter}
