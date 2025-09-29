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
    linkedinUrl: { type: String, default: null },
    occupation: { type: String, default: null },
    workspace: { type: String, default: null },
    mail: { type: String, default: null },
    password: { type: String, default: null },
  },
  progress: {
    level: { type: Number, default: 0 },
    currentPoints: { type: Number, default: 0 },
    actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyActions' }],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
