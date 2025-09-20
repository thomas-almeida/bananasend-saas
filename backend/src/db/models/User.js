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
    age: { type: Number, default: 0 },
    linkedinUrl: { type: String, default: `https://www.linkedin.com/in/` },
    occupation: { type: String, default: null },
    workspace: { type: String, default: null },
    mail: { type: String, default: null },
    password: { type: String, default: null },
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
