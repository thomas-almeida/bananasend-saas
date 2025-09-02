import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Endpoint para teste básico (emails fixos)
export async function testMail(req, res) {
  try {
    const command = new SendEmailCommand({
      Source: "bananasend.contato@gmail.com",
      Destination: {
        ToAddresses: ["bananasend.contato@gmail.com"],
      },
      Message: {
        Subject: {
          Data: "Teste do SES - Funcionando!",
        },
        Body: {
          Text: {
            Data: "Este é um teste do Amazon SES funcionando!",
          },
        },
      },
    });

    const result = await sesClient.send(command);
    
    return res.status(200).json({
      success: true,
      message: "Email enviado com sucesso!",
      messageId: result.MessageId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Erro ao enviar email:", error);
    
    return res.status(500).json({
      success: false,
      message: "Erro ao enviar email",
      error: error.message,
      errorCode: error.name
    });
  }
}

// Endpoint para envio dinâmico de emails
export async function sendEmail(req, res) {
  try {
    // Validação dos dados recebidos
    const { to, subject, message, html } = req.body;

    if (!to || !subject || (!message && !html)) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: to, subject, e (message ou html)"
      });
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({
        success: false,
        message: "Email de destino inválido"
      });
    }

    const command = new SendEmailCommand({
      Source: "bananasend.contato@gmail.com", // Ou process.env.FROM_EMAIL
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          ...(html ? {
            Html: {
              Data: html,
              Charset: "UTF-8",
            }
          } : {}),
          ...(message ? {
            Text: {
              Data: message,
              Charset: "UTF-8",
            }
          } : {})
        },
      },
    });

    const result = await sesClient.send(command);
    
    return res.status(200).json({
      success: true,
      message: "Email enviado com sucesso!",
      messageId: result.MessageId,
      to: to,
      subject: subject,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Erro ao enviar email:", error);
    
    // Tratamento de erros específicos do SES
    let statusCode = 500;
    let errorMessage = "Erro interno do servidor";

    if (error.name === "MessageRejected") {
      statusCode = 400;
      errorMessage = "Email rejeitado - verifique o destinatário";
    } else if (error.name === "SendingPausedException") {
      statusCode = 503;
      errorMessage = "Envio pausado - conta em sandbox ou limite atingido";
    } else if (error.name === "ConfigurationSetDoesNotExistException") {
      statusCode = 400;
      errorMessage = "Configuração de envio inválida";
    }
    
    return res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: error.message,
      errorCode: error.name
    });
  }
}

// Endpoint para envio de emails em lote
export async function sendBulkEmail(req, res) {
  try {
    const { recipients, subject, message, html } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Campo 'recipients' deve ser um array com pelo menos um email"
      });
    }

    if (!subject || (!message && !html)) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: subject, e (message ou html)"
      });
    }

    const results = [];
    const errors = [];

    // Enviar emails um por um (para respeitar limites do sandbox)
    for (const email of recipients) {
      try {
        const command = new SendEmailCommand({
          Source: "bananasend.contato@gmail.com",
          Destination: {
            ToAddresses: [email],
          },
          Message: {
            Subject: {
              Data: subject,
              Charset: "UTF-8",
            },
            Body: {
              ...(html ? {
                Html: {
                  Data: html,
                  Charset: "UTF-8",
                }
              } : {}),
              ...(message ? {
                Text: {
                  Data: message,
                  Charset: "UTF-8",
                }
              } : {})
            },
          },
        });

        const result = await sesClient.send(command);
        results.push({
          email: email,
          messageId: result.MessageId,
          status: "success"
        });

        // Pausa de 1 segundo entre emails (limite do sandbox)
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        errors.push({
          email: email,
          error: error.message,
          errorCode: error.name
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: `${results.length} emails enviados, ${errors.length} falharam`,
      results: results,
      errors: errors,
      total: recipients.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Erro no envio em lote:", error);
    
    return res.status(500).json({
      success: false,
      message: "Erro no envio em lote",
      error: error.message
    });
  }
}