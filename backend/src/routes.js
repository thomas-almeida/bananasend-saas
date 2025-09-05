import { Router } from "express";
import { createUser, getUserById, getUserCount } from "./Controller/UserController.js";
import { createSubscription, listSubscriptions, getSubscriptionById } from "./Controller/SubscriptionsController.js";
import { testMail, sendEmail, sendBulkEmail } from "./Controller/MailController.js";

const api = Router();

api.get("/api/hello", (req, res) => {
  res.send("🍌✉️!!");
});

// Users
api.post("/users", createUser);
api.get("/users/:id", getUserById);
api.get("/users/count", getUserCount);

// Subscriptions
api.post("/subscriptions", createSubscription);
api.get("/subscriptions", listSubscriptions);
api.get("/subscriptions/:id", getSubscriptionById);

// Mail
api.post("/mail/test", testMail);
api.post("/mail/send", sendEmail);
api.post("/mail/bulk", sendBulkEmail);

export default api;
