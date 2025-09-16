import ZohoService from '../Service/zohoService.js';
const zoho = new ZohoService();

export async function createZohoUser(req, res) {
  try {
    const { username, password, domain, displayName, firstName, lastName } = req.body;

    // Primeiro, verifique se o domínio está configurado
    try {
      await zoho.setupCustomerDomain(domain);
    } catch (domainError) {
      console.warn('Domain setup warning:', domainError.message);
      // Continua mesmo se houver erro no domínio (pode já existir)
    }

    // Cria o usuário
    const user = await zoho.createCustomerUser(
      { username, password, displayName, firstName, lastName },
      domain
    );

    // Aguarda um momento antes de tentar habilitar os protocolos
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Tenta habilitar os protocolos
    try {
      if (user.accountId) {
        const protocolResult = await zoho.enableProtocols(user.accountId, {
          imap: true,
          pop: true,
          smtp: true,
        });
        console.log('Protocols enabled successfully:', protocolResult);
      } else {
        console.warn('No accountId found in user response, skipping protocol enablement');
      }
    } catch (protocolError) {
      console.warn('Warning: Could not enable protocols:', protocolError.message);
      // Não falha a criação do usuário por causa disso
    }

    res.status(201).json({
      success: true,
      user,
      message: 'User created successfully. Protocols may take a few minutes to activate.'
    });
  } catch (err) {
    console.error('Error creating Zoho user:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function enableZohoProtocols(req, res) {
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

export async function getEmailConfig(req, res) {
  try {
    const { accountId } = req.params;

    // Obtenha informações da conta (você pode precisar ajustar isso conforme sua API)
    const accountInfo = await zoho.getAccountInfo(accountId);

    const config = {
      incomingServer: {
        imap: {
          server: 'imap.zoho.com',
          port: 993,
          ssl: true
        },
        pop3: {
          server: 'pop.zoho.com',
          port: 995,
          ssl: true
        }
      },
      outgoingServer: {
        smtp: {
          server: 'smtp.zoho.com',
          port: 465,
          ssl: true,
          alternativePort: 587,
          tls: true
        }
      },
      username: accountInfo.primaryEmailAddress,
      // A senha é a que foi definida na criação do usuário
      instructions: 'Use a mesma senha definida ao criar a conta de email'
    };

    res.json({ success: true, config });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function enableProtocols(req, res) {
  try {
    const { accountId, zuid } = req.body;

    const result = await zoho.enableProtocols(accountId, zuid, {
      imap: true,
      pop: true,
    });

    res.json({ success: true, result });
  } catch (err) {
    console.error('Error enabling protocols:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getAccountDetails(req, res) {
  try {
    const { accountId } = req.params;
    const details = await zoho.getAccountDetails(accountId);

    // Verifica quais protocolos estão habilitados
    const protocols = {
      imap: details.imapAccessEnabled || false,
      pop: details.popAccessEnabled || false,
      smtp: details.smtpAccessEnabled || false
    };

    res.json({ success: true, details, protocols });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { accountId, newPassword, zuid } = req.body;

    // Validações básicas da senha
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        error: 'A senha deve ter pelo menos 8 caracteres'
      });
    }

    // Verificar se a senha atende a critérios de complexidade
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        error: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial'
      });
    }

    // Executar o reset de senha
    const result = await zoho.resetPassword(accountId, newPassword, zuid);

    res.json({
      success: true,
      message: 'Senha resetada com sucesso',
      result
    });
  } catch (err) {
    console.error('Error resetting password:', err.message);

    // Tratamento de erros específicos do Zoho
    if (err.response?.status === 404) {
      return res.status(404).json({
        success: false,
        error: 'Conta não encontrada'
      });
    }

    if (err.response?.status === 403) {
      return res.status(403).json({
        success: false,
        error: 'Permissão negada para resetar senha'
      });
    }

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
}