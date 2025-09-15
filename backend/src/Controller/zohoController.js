import ZohoService from '../Service/zohoService.js';
const zoho = new ZohoService();

export async function createZohoUser(req, res) {
  try {
    const { username, password, domain, displayName } = req.body;

    const user = await zoho.createCustomerUser(
      { username, password, displayName },
      domain
    );

    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function enableProtocols(req, res) {
  try {
    const { accountId } = req.body; // você pega esse ID da resposta da criação de usuário
    const result = await zoho.enableProtocols(accountId, {
      imap: true,
      pop: true,
      smtp: true,
    });

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getUserUsage(req, res) {
  try {
    const { accountId } = req.params;
    const usage = await zoho.getUserUsage(accountId);

    res.json({ success: true, usage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function testZohoConnection(req, res) {
  try {
    const result = await zoho.testConnection();
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await zoho.listCustomerUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}