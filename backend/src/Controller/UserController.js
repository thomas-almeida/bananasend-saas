import User from "../db/models/User.js";
import Notifications from "../db/models/Notifications.js";
import DailyActions from "../db/models/DailyActions.js";

export async function createUser(req, res) {
  const { username, email } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(200).json({ user: userExist });
  }

  const user = new User({
    username,
    email,
  });

  await user.save();

  res.status(200).json({ user });
}

export async function getUserById(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ user });
}

export async function getTotalUsers(req, res) {
  const users = await User.countDocuments();
  return res.status(200).json({
    count: users
  })
}

export async function updateOnboarding(req, res) {
  const { id, age, mail, linkedinUrl, occupation, workspace } = req.body;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.onboarding = {
    age,
    linkedinUrl,
    occupation,
    workspace,
    mail
  };

  user.updatedAt = Date.now();

  await user.save();

  res.status(200).json({ user });
}

export async function addDailyAction(req, res) {
  const { userId, action } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const dailyAction = new DailyActions({
    userId,
    action,
  });

  await dailyAction.save();

  user.progress.actions.push(dailyAction._id);

  if (user.progress.currentPoints + 25 >= 100) {
    user.progress.level += 1;
    user.progress.currentPoints = 0;
  } else {
    user.progress.currentPoints += 25;
  }

  user.updatedAt = Date.now();

  await user.save();

  res.status(200).json({ user })
}

export async function addRecipient(req, res) {
  const { userId, recipient } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.recipients.push(recipient);

  await user.save();

  res.status(200).json({ user })
}


export async function removeRecipient(req, res) {
  const { userId, recipient } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.recipients = user.recipients.filter((r) => r !== recipient);

  await user.save();

  res.status(200).json({ user })
}

/**
 * @route   POST /api/users/notifications
 * @desc    Adiciona uma nova notificação ao usuário
 * @access  Private
 */
export async function addNotification(req, res) {
  try {
    const { userId, title, message, type } = req.body;

    // Validação dos campos obrigatórios
    if (!userId || !title || !message || !type) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios não fornecidos"
      });
    }

    // Encontra o usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    // Cria uma nova notificação
    const newNotification = new Notifications({
      title: String(title),
      message: String(message),
      type: String(type),
      read: false
    });

    // Salva a notificação
    const savedNotification = await newNotification.save();

    // Adiciona a referência da notificação ao usuário
    user.notifications.push(savedNotification._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Notificação adicionada com sucesso",
      notification: savedNotification
    });

  } catch (error) {
    console.error('Erro ao adicionar notificação:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao adicionar notificação',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export async function getNotifications(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const userNotifications = user.notifications

    const notifications = await Notifications.find({ _id: { $in: userNotifications } })

    res.status(200).json({ notifications })

  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
  }
}

export async function readNotification(req, res) {
  try {
    const { userId, notificationId } = req.body;

    // 1. Verifica se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    // 2. Verifica se o usuário tem a notificação
    const notificationExists = user.notifications.some(
      id => id.toString() === notificationId
    );

    if (!notificationExists) {
      return res.status(404).json({
        success: false,
        message: "Notificação não encontrada para este usuário"
      });
    }

    // 3. Atualiza a notificação como lida
    const updatedNotification = await Notifications.findByIdAndUpdate(
      notificationId,
      {
        $set: {
          read: true,
          updatedAt: new Date()
        }
      },
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedNotification) {
      return res.status(404).json({
        success: false,
        message: "Notificação não encontrada"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notificação marcada como lida",
      notification: updatedNotification
    });

  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar a solicitação',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export async function updatePublicPage(req, res) {
  try {

    const { userId, title, description } = req.body

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    user.publicPage = {
      title,
      description
    }

    await user.save()

    return res.status(200).json({
      success: true,
      message: "Página pública atualizada com sucesso",
      user
    })

  } catch (error) {
    console.error('Erro ao atualizar página pública:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar a página pública',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export async function getPublicPage(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const userPublicPage = {
      title: user.publicPage.title,
      description: user.publicPage.description,
      audience: user.recipients.length
    }

    res.status(200).json({ userPublicPage })

  } catch (error) {
    console.error('Erro ao buscar página pública:', error);
  }
}