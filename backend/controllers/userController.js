


// export const getUsers = (req, res)=> {
 
//   return res.status(200).json({data: 'all data'});
// };

// export const getUser = (req, res)=> {
//   const userId = Number(req.params.id);
//   const user = data.find((u)=> u.id === userId);
//   if(!user) {
//     return res.status(404).json({data: 'Not FOund'});
//   }

//   return res.status(200).json({name: user.name});
// };

// export const createUser = (req, res)=> {
//  const {number} = req.body;

//  console.log(req.body);
//   return res.status(200).json({data: `all users ${number*number}`});
// };

// export const updateUser = (req, res)=> {
 
//   return res.status(200).json({data: 'all users'});
// };

// export const deleteUser = (req, res)=> {
 
//   return res.status(200).json({data: 'all users'});
// };




import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const updateProfile = async (req, res) => {
  const { email, username } = req.body ?? {};
  try {
    const isExist = await User.findById(req.userId);
    if (!isExist) return res.status(404).json({
      status: 'error',
      message: 'user doesn\'t exist'
    });
  
     isExist.username = username || isExist.username;
     isExist.email = email || isExist.email;
     await isExist.save();

    return res.status(200).json({
      status: 'success',
      message: 'profile updated successfully'
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
}




export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) return res.status().json({ status: 'error', data: ('please provide your details to login') })

        let account = await User.findOne({ email });
        if (!account) return res.status(404).json({ status: 'error', data: "User doesnot exist" })

        const pass = bcrypt.compareSync(password, account.password);
        if (!pass) return res.status(400).json({ status: 'error', data: "Invalid password" });

        const token = jwt.sign({
            id: account.id,
            role: account.role,
        }, 'secret');
        return res.status(200).json({
            status: 'success',
            data: {
                token,
                role: account.role
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error.message
        })
    }
}


// export const registerUser = async(req, res) => {

//   const {email, password, username} = req.body ?? {};

// try{
//   await User.create({
//     email, 
//     password,
//     username
//   });
//   res.status(200).json({
//     status: "success",
//     data: "user is successfully added"
//   })

// }catch(err){
//   return res.status(400).json({
//     status: 'error',
//     data: err.message
//   });
// }

// }

export const registerUser = async (req, res) => {

    const { username, email, password, role } = req.body || {};

    try {
        const hashPass = bcrypt.hashSync(password, 10)
        const user = await User.create({

            username: username,
            password: hashPass,
            email: email,
            role: role
        })
        res.status(200).json({
            status: 'success',
            data: 'User registered successfully',
            user
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error.message
        })
    }
}
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    return res.status(200).json({
      status: 'success',
      user
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
}


export const updateUser = async(req, res) => {
  const {id} = req.params;
  const {username, email, password, role} = req.body ?? {};
  try{
    const user = await User.findById(id);
    if(!user) {
      return res.status(404).json({
        status: 'error',
        data: 'User not found'
      });
    } 

    //x = newvalue || oldvalue     --> this means assign new value if exists or else keep the old value.
      user.username = username ||user.username;
      user.password = password ||user.password;
      user.email = email ||user.email;
      user.role = role ||user.role;
    
      //saves the data in MongoDB
    await user.save();
    //response to the client
     return res.status(200).json({
      status: 'success',
      data: 'User updated successfully',
    });

  }catch(err){
    return res.status(400).json({
      status: 'error',
      data: err.message
    });
  }
}




