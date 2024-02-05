import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Getting a user
export const getUsers = async (req, res, next) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'Returns all users'
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const users = await User.find({
      ...(req.query.userId && { _id: req.query.userId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (users.length === 0) {
      return next(errorHandler(404, "User not found"));
    }

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
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userShema"
                    }
                }
            }
        }
    */
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
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
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateUserShema"
                    }
                }
            }
        }
    */
  try {
    const updateFields = {};

    if (req.body.firstName !== undefined && req.body.firstName !== "") {
      updateFields.firstName = req.body.firstName;
    }
    if (req.body.lastName !== undefined && req.body.lastName !== "") {
      updateFields.lastName = req.body.lastName;
    }
    if (req.body.email !== undefined && req.body.email !== "") {
      updateFields.email = req.body.email;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({ message: "User has been updated", updatedUser });
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
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    res.status(200).json({
      message: "User has been deleted",
      deletedUser: user,
    });
  } catch (error) {
    next(error);
  }
};
