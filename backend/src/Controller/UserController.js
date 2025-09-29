import User from "../db/models/User.js";
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