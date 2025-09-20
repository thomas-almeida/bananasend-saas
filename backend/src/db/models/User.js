import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  // avatar removido para refletir estrutura de produção
  subscriptionId: { type: String, default: "FREE" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  mails: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mails' }],
  onboarding: {
    age: Number,
    linkedinUrl: String,
    occupation: String,
    workspace: String,
    mail: String,
    password: String,
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
