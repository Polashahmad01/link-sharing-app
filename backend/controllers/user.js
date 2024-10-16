import { validationResult } from "express-validator";
import User from "../models/User.js";

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        "Unable to proceed. The information you entered is not valid. Please review and correct your entries."
      );
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { firstName, lastName, email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "User already exists",
      });
    }

    const user = await User.create({ firstName, lastName, email, password });
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User has been successfully registered.",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        "Unable to proceed. The information you entered is not valid. Please review and correct your entries."
      );
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid email address or password.",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User has been successfully logged in.",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        "Unable to proceed. The information you entered is not valid. Please review and correct your entries."
      );
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { _id } = req.body;
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Sorry we couldn't find a user with that information!",
        data: "Sorry we couldn't find a user with that information!",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User is available",
      data: {
        _id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        profilePicture: existingUser.profilePicture,
        links: existingUser.links,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default {
  createUser,
  loginUser,
  getSingleUser,
};
