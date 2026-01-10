// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { createUser, deleteUser, getUser, getUsers, updateUser } from './controllers/userController.js';
// import { notAllowed } from './utils/notAllowed.js';


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 👇 Sample route to test your connection -- req-rquest object (req holds all info about what the client sent), res--response object(what the server sends back to the client)
// app.get('/', (req, res) => {
//   const {a} = req.query;
// // if (!a || isNaN(a)) {
// //   return res.status(400).json({
// //     status: 'error',
// //     data: 'Please provide a valid number'
// //   });
// // }

// //   const num = Number(a);
// //   const square = num * num;
// //   console.log(`Square of ${num} is:`, square);

// console.log(a);

//   return res.status(200).json({
//     status: 'success',
//     // square: square,
//     data: 'hello jee welcome to Server'
//   });
// });

// //users getAllUsers, getSingleUser, post, delete,  update
// const data = [
//     {
//         "id": 1,
//         "name": "Sadiksha",
//         "age": 29
//     },
//     {
//         "id": 2,
//         "name": "Samu",
//         "age": 40
//     },
//     {
//         "id": 3,
//         "name": "Subu",
//         "age": 80
//     }
    
// ];



// //middleware -- middleware esari sabai ko agadi rakhyo bhane it works for both route of users

// //express.json le k garcha? => it tells express app to automatically understamd JSON data coming from the client -- client side bata send gareko data lai object form ma lini garcha yo middleware le
// // app.use(express.json());  mathi lekhni ho



// // app.use((req,res,next)=> {
// //   const {a} = req.query;
// //   if (a % 2 === 0) {
// //     next();
// //   } else{
// //     return res.status(400).json({
// //       status: 'Error',
// //       data: 'Please provide even number'
// //     })
// //   }
  
// // });

// //api ko name same cha bhane do this way
// app.route('/api/users')
// .get(getUsers)
// .post(createUser).all(notAllowed);

// app.route('/api/users/:id')
// .get(getUser)
// .patch(updateUser)
// .delete(deleteUser).all(notAllowed);


// //product
// const products = [
//   {
//     "id": 1,
//     "name": "Laptop",
//     "price": 85000,
//     "category": "Electronics"
//   },
//   {
//     "id": 2,
//     "name": "Headphones",
//     "price": 3500,
//     "category": "Accessories"
//   },
//   {
//     "id": 3,
//     "name": "Smartphone",
//     "price": 65000,
//     "category": "Electronics"
//   },
//   {
//     "id": 4,
//     "name": "Backpack",
//     "price": 2000,
//     "category": "Fashion"
//   },
//   {
//     "id": 5,
//     "name": "Watch",
//     "price": 5000,
//     "category": "Fashion"
//   }
// ];




// const getProducts = (req, res)=> {
//   const idandname = products.map(p => ({
//     id: p.id,
//     name: p.name
//   }));
//   return res.status(200).json({products: idandname});
// };

// const getProduct = (req, res)=> {
//   const productId = req.params.id;
//   const product = data. find((p)=> p.id === productId)
//   if (!product){
//     return res.status(400).json({data: 'NOT FOUND'})
//   }

//   return res.status(200).json({data: 'single product'});
// };

// const createProducts = (req, res)=> {
//   return res.status(200).json({data: 'all products'});
// };
// const updateProducts = (req, res)=> {
//   return res.status(200).json({data: 'all products'});
// };

// const deleteProducts =(req, res)=> {
//   return res.status(200).json({data: 'all products'});
// };


// app.get('/api/products', getProducts);

// app.get('/api/products/:id', getProduct);
 
// app.post('/api/products', createProducts);

// app.patch('/api/products/:id', updateProducts);

// app.delete('/api/products/:id', deleteProducts);




// // 👇 You can set PORT=5000 in your .env or use default 5000
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));




// //CALL-BACK Function
// const greet = () => {
//   console.log('hello jee')
// }
// const func= (iscall, greet) => {
//   if (iscall){

//     greet();
    
//   }
// }

// func(true, greet); //false huda call hudaina 


// //



import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config({
  quiet: true
});


const app = express();
const port = 5000;

app.use(cors({
  origin: ['https://full-stack-dr7e.vercel.app', 'http://localhost:5173']
}));
app.use(express.json());
app.use('/uploads',express.static('uploads'));
app.use(fileUpload({
  limits: {fileSize: 5 * 1024 * 1024},
}));

//importing routes
app.use(productRoutes);
// app.use(userRoutes);
app.use('/api/users', userRoutes);
app.use(orderRoutes);


//then successfully connect bhaye pachi listen garni .. catch ma error catch garni
mongoose.connect(process.env.DB_URL).then((val) => {
  app.listen(port, () => {
    console.log(`Connected and server is running on ${port}`);
  });
}).catch((err) => {
  console.log(err);
});


//nodemailer bata email pathauni
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'sadikshamahat123@gmail.com',
    pass: 'lczvzmwmbrvhhkex'
  }
});
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: 'hello jee welcome to Server'
  });
});


// ?? le crash huna dinna even if value is undefined
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body ?? {};
  try {
    const info = await transporter.sendMail({
      from: '"Sadiksha" <sadikshamahat123@gmail.com>',
      to,
      subject,
      text
    });
    return res.status(200).json({
      message: info
    });

      } catch (err) {
    return res.status(500).json({
      error: err.message
    });

  }
});