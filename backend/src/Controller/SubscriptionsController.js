import Subscriptions from "../db/models/Subscriptions.js";

// Create a new subscription plan
export async function createSubscription(req, res) {
  try {
    const { name, price, description, features } = req.body;

    if (!name || price == null) {
      return res.status(400).json({ message: "'name' e 'price' são obrigatórios" });
    }

    // Optional: prevent duplicate plan names
    const existing = await Subscriptions.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Já existe um plano com esse nome", subscription: existing });
    }

    const subscription = new Subscriptions({
      name,
      price,
      description: description || "",
      features: Array.isArray(features) ? features : [],
    });

    await subscription.save();

    return res.status(201).json({ subscription });
  } catch (err) {
    console.error("Erro ao criar subscription:", err);
    return res.status(500).json({ message: "Erro ao criar subscription" });
  }
}

// List all available subscriptions
export async function listSubscriptions(req, res) {
  try {
    const subscriptions = await Subscriptions.find({}).sort({ price: 1, createdAt: -1 });
    return res.status(200).json({ subscriptions });
  } catch (err) {
    console.error("Erro ao listar subscriptions:", err);
    return res.status(500).json({ message: "Erro ao listar subscriptions" });
  }
}

// (Opcional) Get subscription by id
export async function getSubscriptionById(req, res) {
  try {
    const { id } = req.params;
    const subscription = await Subscriptions.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription não encontrada" });
    }
    return res.status(200).json({ subscription });
  } catch (err) {
    console.error("Erro ao buscar subscription:", err);
    return res.status(500).json({ message: "Erro ao buscar subscription" });
  }
}
