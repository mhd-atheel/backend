import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler';


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
})

const authUser = asyncHandler(async (req, res) => {
    const { email, pass } = req.body;
  
    const user = await User.findOne(email);
  
    if (user && await bcrypt.compare(pass, user.pass)) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
      });
    } else {
      res.status(401).json({
        error: 'Invalid email and password',
      });
    }
  });

const registerUser = asyncHandler(async (req, res) =>{
    const {userName, pass, email} = req.body;
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User Already Exists!')
    } 

    
    const user = new User({
      userName,
      pass,
      email
    })
    
    const user_crypt = await user.save()
    
    if(user_crypt){
        res.status(200).json({
            _id: user_crypt._id,
            userName: user_crypt.userName,
            pass : user_crypt.pass,
            email : user_crypt.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data')
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const ID = req.params.id;
    const userData = await User.findById(ID)
    res.status(200).json(userData);

    } catch (error) {

      res.status(404);
      throw new Error('User not found');
    }
  });

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



export {
    getAllUsers,
    authUser,
    registerUser,
    getUserProfile,
    deleteUser
};

