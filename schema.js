// Import Mongoose
const mongoose = require("mongoose");

// Define the Profile Schema (embedded document)
const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Ensure the first name is required
  },
  lastName: {
    type: String,
    required: true, // Ensure the last name is required
  },
  age: {
    type: Number,
    min: 0, // Age cannot be negative
  },
});

// Define the User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure username is unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: /.+\@.+\..+/ // Regex for email validation
    },
    password: {
      type: String,
      required: true, // Password is mandatory
    },
    roles: {
      type: [String], // Array of strings for user roles
      default: ["user"], // Default role
    },
    profile: ProfileSchema, // Embed the Profile Schema
    lastLogin: {
      type: Date, // Store the last login date
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the User Model
module.exports = mongoose.model("User", UserSchema);
