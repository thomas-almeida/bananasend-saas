import { Router } from "express";
import { createUser, getUserById, getTotalUsers, updateOnboarding } from "./Controller/UserController.js";
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
api.put("/zoho/reset-password", resetPassword);
api.post("/zoho/send-mail", sendZohoMail);
api.put("/zoho/add-alias", addEmailToUser);

api.post("/shop/create-product", createProduct)
api.get("/shop/get-product-by-id/:id", getProductsById)

//ABKT
api.post("/abkt/create-payment", createABKTPayment)
api.post("/abkt/webhook", triggerWebhook)
api.post("/abkt/test-webhook", (req, res) => {
    const testEvent = {
        event: 'billing.paid',
        data: {
            payment: {
                amount: 1000,
                fee: 80,
                method: 'PIX'
            },
            billing: {
                amount: 1000,
                couponsUsed: [],
                customer: {
                    id: 'cust_4hnLDN3YfUWrwQBQKYMwL6Ar',
                    metadata: {
                        cellphone: '11111111111',
                        email: 'christopher@abacatepay.com',
                        name: 'Christopher Ribeiro',
                        taxId: '12345678901'
                    }
                },
                frequency: 'ONE_TIME',
                id: 'bill_QgW1BT3uzaDGR3ANKgmmmabZ',
                kind: ['PIX'],
                paidAmount: 1000,
                products: [
                    {
                        externalId: "123",
                        id: "prod_RGKGsjBWsJwRn1mHyGMFJNjP",
                        quantity: 1
                    }
                ],
                status: "PAID"
            }
        },
        devMode: false
    };

    // Simula o webhook
    triggerWebhook({ ...req, body: testEvent, query: { webhookSecret: process.env.WEBHOOK_SECRET } }, res);
});

export default api;
