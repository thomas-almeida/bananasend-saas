import { Router } from "express";
import { createUser, getUserById, getTotalUsers, updateOnboarding, addDailyAction, addRecipient, removeRecipient } from "./Controller/UserController.js";
import { createSubscription, listSubscriptions, getSubscriptionById } from "./Controller/SubscriptionsController.js";
import { sendEmail } from "./Controller/MailController.js";
import { createZohoUser, enableProtocols, getUserUsage, testZohoConnection, listUsers, getAccountDetails, resetPassword, sendZohoMail, addEmailToUser } from "./Controller/zohoController.js";
import { createProduct, getProductsById } from "./Controller/ShopController.js"
import { createABKTPayment, triggerWebhook } from "./Controller/paymentController.js"

const api = Router();

api.get("/api/hello", (req, res) => {
    res.send("🍌✉️!!");
});

// Users
api.post("/users", createUser);
api.get("/users/:id", getUserById);
api.get("/wishlist-total", getTotalUsers);
api.put("/users/onboarding", updateOnboarding);
api.put("/users/add-action", addDailyAction);
api.put("/users/add-recipient", addRecipient);
api.put("/users/remove-recipient", removeRecipient);

// Subscriptions
api.post("/subscriptions", createSubscription);
api.get("/subscriptions", listSubscriptions);
api.get("/subscriptions/:id", getSubscriptionById);

//Zoho
api.post("/zoho/create-user", createZohoUser);
api.put("/zoho/enable-protocols", enableProtocols);
api.get("/zoho/user-usage/:accountId", getUserUsage);
api.get("/zoho/domain-info", testZohoConnection);
api.get("/zoho/list-users", listUsers);
api.get("/zoho/get-account-details/:accountId", getAccountDetails);
api.put("/zoho/reset-password", resetPassword);
api.post("/zoho/send-mail", sendZohoMail);
api.put("/zoho/add-alias", addEmailToUser);

api.post("/shop/create-product", createProduct)
api.get("/shop/get-product-by-id/:id", getProductsById)

//ABKT
api.post("/abkt/create-payment", createABKTPayment)
api.post("/abkt/webhook", triggerWebhook)

export default api;
