import User from "../db/models/User.js";

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

export async function getUserCount(req, res) {
  try {
    const count = await User.countDocuments({});
    return res.status(200).json({ count });
  } catch (err) {
    return res.status(500).json({ message: "Failed to get user count" });
  }
}