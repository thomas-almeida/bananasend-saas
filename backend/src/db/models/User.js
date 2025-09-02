import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  avatar: String,
  subscriptionId: { type: String, default: "FREE" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  mails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mails' }]
});

const User = mongoose.model("User", UserSchema);

export default User;
