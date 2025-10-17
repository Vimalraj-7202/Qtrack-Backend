import { registerUser, loginUser } from "../../services/auth/user.service.js";

//register
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//protected route
export const getProfile = (req, res) => {
  res.json({ user: req.user });
};

export const adminRoute = (req, res) => {
  res.json({
    message: "Welcome admin!",
    user: req.user,
  });
};
