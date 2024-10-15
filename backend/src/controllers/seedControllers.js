const User = require("../models/userModel");
const data = require("../seed");

const getSeedUsers = async (req, res, next)=>{

    try {
        //delete  all users

        await User.deleteMany();
        //create 2 users
        const users =   await  User.insertMany(data.users);
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
}

module.exports = {getSeedUsers};