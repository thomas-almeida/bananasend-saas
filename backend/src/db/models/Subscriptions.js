import mongoose from "mongoose";

const SubscriptionsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  features: [String],
  usersInSubscription: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Subscriptions = mongoose.model("Subscriptions", SubscriptionsSchema);

export default Subscriptions;
