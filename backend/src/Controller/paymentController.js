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

    // Verifica se a requisição é POST e tem o content-type correto
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Verifica se o content-type é application/json
    const contentType = req.header('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        return res.status(400).json({ error: 'Invalid content type' });
    }

    // Processa a notificação
    const event = req.body;
    console.log('ABKT WEBHOOK:', JSON.stringify(event, null, 2));

    // Verifica se é um evento de pagamento aprovado
    if (event.event === 'billing.paid') {
        console.log('Pagamento aprovado:', event.data);

        const { payment, billing } = event.data;

        // Dados do pagamento
        console.log('Valor pago:', payment.amount);
        console.log('Taxa:', payment.fee);
        console.log('Método:', payment.method);

        // Dados da cobrança
        console.log('ID da cobrança:', billing.id);
        console.log('Status da cobrança:', billing.status);
        console.log('Valor total:', billing.paidAmount);
        console.log('Frequência:', billing.frequency);

        // Dados do cliente
        if (billing.customer) {
            console.log('Cliente:', billing.customer.metadata);
            console.log('Email do cliente:', billing.customer.metadata.email);
            console.log('Nome do cliente:', billing.customer.metadata.name);
        }

        // Produtos comprados
        if (billing.products && billing.products.length > 0) {
            console.log('Produtos:', billing.products);
        }

        // Aqui você pode adicionar lógica para:
        // - Atualizar status da assinatura no seu banco
        // - Enviar email de confirmação
        // - Ativar serviços do usuário
        // - Salvar dados do pagamento para controle interno
    } else {
        console.log('Evento recebido (não é billing.paid):', event.event);
    }

    res.status(200).json({ received: true });
}
