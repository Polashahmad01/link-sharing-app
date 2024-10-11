import { validationResult } from "express-validator";
import User from "../models/User.js";

const createProfile = async (req, res, next) => {
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

    const { profilePicture, firstName, lastName, email } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          profilePicture: profilePicture,
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Your changes have been successfully saved!",
        data: user,
      });
    }
    return res.status(200).json({
      success: false,
      statusCode: 404,
      message: "Sorry we couldn't find a user with that information!",
      data: null,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default {
  createProfile,
};
