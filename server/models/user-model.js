const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    avatarUrl: { type: String, default: "" },
    firstName: { type: String, unique: true, required: true },
    secondName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    friends: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  },
);

module.exports = model("User", UserSchema);
