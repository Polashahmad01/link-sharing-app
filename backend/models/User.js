import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Password hashing before saving user
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = bcryptjs.hash(this.password, salt);
  next();
});

// Compare password method


const User = mongoose.model("User", userSchema);
export default User;
