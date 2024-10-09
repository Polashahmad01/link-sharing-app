import { validationResult } from "express-validator";
import User from "../models/User.js";

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error("Unable to proceed. The information you entered is not valid. Please review and correct your entries.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { firstName, lastName, email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      return res.status(400).json({ success: false, statusCode: 400, message: "User already exists" });
    }

    const user = await User.create({ firstName, lastName, email, password });
    return res.status(201).json({ success: true,  statusCode: 201, message: "User has been successfully registered.", data: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default {
  createUser
}
