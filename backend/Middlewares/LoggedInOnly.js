const jwt = require("jsonwebtoken");

const LoggedInOnly = (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (!token) {
      const header = req.headers["authorization"];
      if (header && header.startsWith("Bearer ")) {
        token = header.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid or expired token",
          success: false,
        });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = LoggedInOnly;
