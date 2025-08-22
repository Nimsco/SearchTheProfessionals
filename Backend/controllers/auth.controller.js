
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword }); 
    await user.save();

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (e) {
    console.error("Error in register:", e); 
    return res.status(500).send({ message: "Registration failed", error: e.message });
  }
}



export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).send({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


    const safeUser = {
  _id: user._id,
  username: user.username,
  email: user.email ?? "",
  createdAt: user.createdAt, 
};
res.json({ message: "Login successful", user: safeUser, token });

  } catch (e) {
    return res.status(500).send({ message: "Server error", error: e.message });
  }
}


export async function getAllUsers(req, res) {
  try {
    const search = req.query.search || '';
    const users = await User.find(
      { username: { $regex: search, $options: 'i' } },
      '-password'
    );

    res.status(200).json(users);
  } catch (e) {
    res.status(500).send({ message: "Failed to retrieve users", error: e.message });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // don’t return password

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: "Failed to retrieve user", error: e.message });
  }
}


export async function updateMe(req, res) {
  try {
    const userId = req.user.id;
    const { education, degree, hobbies, currentWorkplace } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        education,
        degree,
        hobbies,
        currentWorkplace,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    const safeUser = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email || '',
      education: updatedUser.education,
      degree: updatedUser.degree,
      hobbies: updatedUser.hobbies,
      currentWorkplace: updatedUser.currentWorkplace,
      createdAt: updatedUser.createdAt
    };

    res.json(safeUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
}







