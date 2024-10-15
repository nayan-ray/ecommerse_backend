const multer  = require('multer');
const createError = require('http-errors');
const { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config');

 // first method

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //destination
      cb(null, 'Public/images/usersImages')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname;
      cb(null, filename)
    }
  })
  
  const fileFilter =(req, file, cb)=>{
    //take extension name from file
    const extension =  file.mimetype.split('/')[1];
    //check  if extension is in allowed file type

    if( !ALLOWED_FILE_TYPES.includes(extension) ){
       cb(createError(400, 'file type not allowed'), false)
    } else{

      cb(null, true)

    }
   
  }

   

//second method

//  const storage = multer.memoryStorage({});

//  const  fileFilter = (req, file, cb) => {
//       const extension = file.mimetype.split('/')[1];
//       if (!ALLOWED_FILE_TYPES.includes(extension)) {
//          cb(createError(400, 'file type not allowed'), false);
//       } 
      
//       if(!file.mimetype.startsWith('image/')){
//           cb(createError(400,'file type not allowed'), false)
//       }

//       if(file.size  > MAX_FILE_SIZE){
//         cb(createError(400,'file size is too large'), false)
//       }

//       cb(null,  true);

//  }



  const upload = multer({ 
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE }, 
     fileFilter: fileFilter
  
  })


  module.exports =  upload;
