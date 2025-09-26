import { createBillingIntent } from "../Service/paymentService.js"

export async function createABKTPayment(req, res) {
    const {
        frequency,
        methods,
        products,
        allowCupons,
        completionUrl,
        returnUrl
    } = req.body

    const response = await createBillingIntent({
        frequency,
        methods,
        products,
        allowCupons,
        completionUrl,
        returnUrl
    })

    if (response.data?.url) {
        return res.status(200).json(response.data)
    }

    return res.status(response.status).json(response.data)

}

export async function triggerWebhook(req, res) {
    const webhookSecret = req.query.webhookSecret

    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
        return res.status(401).json({ error: 'Invalid webhook secret' });
    }

    // Processa a notificação
    const event = req.body;
    console.log('ABKT WEBHOOK:', event);

    res.status(200).json({ received: true });
}
