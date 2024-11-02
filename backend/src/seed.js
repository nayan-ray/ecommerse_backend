const data = {
      users :[
        {
            name : "John",
            email  : "john@example.com",
            password  : "123456",
            phone :"01723846924",
            address : "Dhaka",
            isAdmin: false,
            isBanned: false,
        },
        {
            name : "Jane",
            email  : "jane@example.com",
            password  : "123456",
            phone :"01723846924",
            address : "Dinajpur",
            isAdmin: true,
            isBanned: false,
        },
         {
          name : "nayan",
          email  : "niranzanroy1@gmail.com",
          password  : "123456",
          phone :"01723846924",
          address : "Dinajpur",
          isAdmin: true,
          isBanned: false,
       }

      ],
      products : [
        {
            name : "iphone 11",
            slug :  "iphone-11 ",
            description :  "This is a good phone",
            price  :  50000 ,
            image : '',
            quantity : 10 ,
            sold : 50,
            category : '6725bf2d03ece382cc62b9ba'
        },
        {
            name : "samsung s10",
            slug :  "samsung-s10 ",
            description :  "This is a good phone",
            price  :  40000 ,
            image : '',
            quantity : 10 ,
            sold : 50 ,
            category : '6725bf8203ece382cc62b9bc'
        }
      ]
}

module.exports  = data;
