const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// Assuming you have a secret key for JWT
dotenv.config();
// Middleware to authenticate using token from cookies
const authenticationToken = (req, res, next) => {
  // Access the token from cookies
  const token = req.cookies?.token; // 'authToken' is the key used to store the token in cookies
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing!" });
  }

  try {
    // Verify the token using the secret key
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifiedUser;

    next();
  } catch (error) {
    // Handle token verification failure
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
};

module.exports = { authenticationToken };
