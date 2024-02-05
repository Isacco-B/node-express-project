import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Getting all users
export const getUser = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'Returns all users'
  try {
    const users = await User.findById(req.params.userId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Creating a user
export const createUser = async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Create a new user'
  // #swagger.description = 'Create a new user with the provided data'
  if (!req.body.firstName && !req.body.lastName && !req.body.email) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// Updating a user
export const updateUser = async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Update a user'
  // #swagger.description = 'Update a user with the provided data'
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Deleting a user
export const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Delete a user'
  // #swagger.description = 'Delete a user with the provided data'
  try {
    await User.findOneAndDelete(req.params.userId);
    res.status(200).json("The user has been deleted");
  } catch (error) {
    next(error);
  }
};
