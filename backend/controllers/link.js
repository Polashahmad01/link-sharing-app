import { validationResult } from "express-validator";
import User from "../models/User.js";

const createNewLink = async (req, res, next) => {
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

    const { _id, items } = req.body;
    const userExits = await User.findById(_id);
    if (!userExits) {
      return res.status(404).json({
        success: false,
        satusCode: 404,
        message: "Sorry we couldn't find a user with that information!",
        data: null,
      });
    }

    if (userExits.links.length === 0) {
      userExits.links = items;
    } else {
      const existingLinks = userExits.links;

      const newItems = items.filter(
        (newItem) =>
          !existingLinks.some((existingItem) => existingItem.id === newItem.id)
      );

      userExits.links.push(...newItems);
    }

    const updatedUser = await userExits.save();

    return res
      .status(200)
      .json({
        success: true,
        data: {
          _id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          links: updatedUser.links,
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
  createNewLink,
};
