import { Router } from "express";
import { createUser, getUserById } from "./Controller/UserController.js";
import { createSubscription, listSubscriptions, getSubscriptionById } from "./Controller/SubscriptionsController.js";
import { testMail, sendEmail, sendBulkEmail } from "./Controller/MailController.js";

const api = Router();

api.get("/api/hello", (req, res) => {
  res.send("🍌✉️!!");
});

api.post("/users", createUser);
api.get("/users/:id", getUserById);

// Subscriptions
api.post("/subscriptions", createSubscription);
api.get("/subscriptions", listSubscriptions);
api.get("/subscriptions/:id", getSubscriptionById);

// Mail
api.post("/mail/test", testMail);
api.post("/mail/send", sendEmail);
api.post("/mail/bulk", sendBulkEmail);

export default api;
