import bcryptjs from 'bcryptjs';
import { errorHandler } from '../Utils/ErrorHandler.js';
import User from '../model/Usermodel.js';
import Admin from '../model/AdminModel.js';

export const test = ( res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async(req, res, next) =>{
       
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password,...rest } = updatedUser._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};



export const deleteuser = async(req, res , next)=>{
  if (req.user.id !== req.params.id)
  return next(errorHandler(401, 'You can only Delete your own account!'));

  try {
      await User.findByIdAndDelete(req.params.id);
      res.clearCookie('acccess_token')
      res.status(200).json("user has been delete successfullly ");
  } catch (error) {
      next(error);
  }

} 
export const updateAdmin = async(req, res, next) =>{
       
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password,...rest } = updatedUser._doc;

    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};



export const deleteAdmin = async(req, res , next)=>{
  if (req.user.id !== req.params.id)
  return next(errorHandler(401, 'You can only Delete your own account!'));

  try {
      await Admin.findByIdAndDelete(req.params.id);
      res.clearCookie('acccess_token')
      res.status(200).json("user has been delete successfullly ");
  } catch (error) {
      next(error);
  }

} 