const {body} = require("express-validator");

//user input validation

const validateUserRegistration = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min:3, max : 50})
    .withMessage("name should  be between 3 to 50 characters"),
    

]


module.exports =  {validateUserRegistration};
