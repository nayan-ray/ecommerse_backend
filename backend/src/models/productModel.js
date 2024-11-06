const {Schema, model} =  require('mongoose');


const productSchema =  new Schema({
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
    },
    description : {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minLength : [10, 'Description must be more than 10 characters'],

    },
    price : {
        type: Number,
        trim: true,
        required: [true, 'Price is required'],
        validate : {
            validator : (value) =>  value > 0,
            message : (props)=> {return `${props.value} is not valid price. pr
            ice must be greater than o`},
            
        },
       
    },
    quantity : {
        type: Number,
        trim: true,
        required: [true, 'Quantity is required'],
        validate : {
            validator : (value) =>  value > 0,
            message : (props)=> {return `${props.value} is not valid quantity.
            quantity must be greater than o`},
            
        },
    },
    sold : {
        type: Number,
        trim: true,
        required: [true, 'Sold is required'],
        validate : {
            validator : (value) =>  value > 0,
            message : (props)=> {return `${props.value} is not valid sold.
            Sold must be greater than o`},
            
        },
    },
    shipping : {
        type: Number,
        default : 0,

    },
    image :{
        type: String,
        default : ''
    },
    category : {
        type : Schema.ObjectId,
        ref : 'Category',
        required : [true, 'Category is required'],
    }


},

 {timestamps : true}


);

const  Product = model('Product', productSchema);
module.exports =  Product;
