import mongoose from "mongoose";

const MailsSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String,
  createdAt: { type: Date, default: Date.now },
  to: String,
  from: [String],
  subject: String,
  status: { type: String, default: "draft" },
});

const Mails = mongoose.model("Mails", MailsSchema); 

export default Mails;
