const express  = require('express');
const { getSeedUsers } = require('../controllers/seedControllers');
const seedRouter =  express.Router();

seedRouter.get("/users", getSeedUsers )




module.exports = {seedRouter}