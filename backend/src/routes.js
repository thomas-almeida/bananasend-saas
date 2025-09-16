import { Router } from "express";
import { createUser, getUserById, getTotalUsers } from "./Controller/UserController.js";
import { createSubscription, listSubscriptions, getSubscriptionById } from "./Controller/SubscriptionsController.js";
import { sendEmail } from "./Controller/MailController.js";
import { createZohoUser, enableProtocols, getUserUsage, testZohoConnection, listUsers, getAccountDetails } from "./Controller/zohoController.js";

const api = Router();

api.get("/api/hello", (req, res) => {
  res.send("🍌✉️!!");
});

// Users
api.post("/users", createUser);
api.get("/users/:id", getUserById);
api.get("/wishlist-total", getTotalUsers);

// Subscriptions
api.post("/subscriptions", createSubscription);
api.get("/subscriptions", listSubscriptions);
api.get("/subscriptions/:id", getSubscriptionById);

// Mail
api.post("/mail/send", sendEmail);

//Zoho
api.post("/zoho/create-user", createZohoUser);
api.put("/zoho/enable-protocols", enableProtocols);
api.get("/zoho/user-usage/:accountId", getUserUsage);
api.get("/zoho/domain-info", testZohoConnection);
api.get("/zoho/list-users", listUsers);
api.get("/zoho/get-account-details/:accountId", getAccountDetails);

export default api;
