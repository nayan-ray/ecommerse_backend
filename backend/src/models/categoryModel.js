const {Schema, model} =  require('mongoose');


const categorySchema =  new Schema({
    name: {
        type: String, 
        required: [true ,  'Name is required'],
        trim: true,
        maxLength: [50, 'Name must be less than 50 characters'],
        minLength: [3, 'Name must be more than 3 characters'],
    },
    slug : {
        type: String,
        required: [true, 'Slug is required'],
        lowecase : true,
        unique  : true,
    }
},

 {timestamps : true}


);

const  Category = model('category', categorySchema);
module.exports =  Category;
