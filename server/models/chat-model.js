const { Schema, model } = require("mongoose");

const MemberSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, enum: ["owner", "member"], default: "member" },
});

const ChatSchema = new Schema(
  {
    type: { type: String, enum: ["private", "group"], required: true },
    members: { type: [MemberSchema], required: true },
    avatarUrl: { type: String },
    chatName: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Group", ChatSchema);
