import config from "../config/index.js";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  console.log("Generating token for user: ", user);

  // Token is generated 
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.env.jwtSecret,
    { expiresIn: config.env.jwtExpiresIn }
  );

  // verify the token 
  try {
    const decoded = jwt.verify(token, config.env.jwtSecret);
    console.log("Token decoded successfully:", decoded);
  } 
catch (err) {
    console.error("Token verification failed:", err.message);
  }

  return token;
};