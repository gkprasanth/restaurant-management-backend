const jwt = require("jsonwebtoken");

const auth = (role) => {
  return (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, "secret_key");
      req.user = decoded;

      if (role && req.user.role !== role)
        return res.status(403).json({ error: "Forbidden" });

      next();
    } catch (err) {
      res.status(400).json({ error: "Invalid token" });
    }
  };
};

module.exports = auth;
