import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error("Auth failed:", err);
      res.status(401).json({ message: "Unauthorized - invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }
};

// export const protect = async (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1];
//   if (!token)
//     return res.status(401).json({ message: "No token, not authorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

export const registerValidation = (data) => {
  const { email, password } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, message: "Invalid email format" };
  }
  if (!password || password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long",
    };
  }
  return { valid: true };
};

export const loginValidation = (data) => {
  const { email, password } = data;
  if (!email || !password) {
    return { valid: false, message: "Email and password are required" };
  }
  return { valid: true };
};