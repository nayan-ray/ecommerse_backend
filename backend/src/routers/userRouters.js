const express  = require('express');
const { getUsers, getUserById, deleteUserById, userRegister, activeUserProcess, updateUser } = require('../controllers/userControllers');
const upload = require('../middleware/fileUpload');
const { isLoggedIn } = require('../middleware/auth');



const userRouter =  express.Router();

 

userRouter.get("/", isLoggedIn, getUsers )
userRouter.get("/:id", getUserById)
userRouter.delete("/:id",  deleteUserById)
userRouter.post("/process-register", upload.single('userImage') , userRegister)  

userRouter.post("/verify", activeUserProcess)
userRouter.put("/:id" , upload.single('userImage') , updateUser)



module.exports = {userRouter}
