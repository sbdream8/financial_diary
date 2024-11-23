const jwt = require('jsonwebtoken');

const authenticate = async (req) => {
  const token = req.headers.authorization || '';
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { id: decoded.id };
  } catch (err) {
    return null;
  }
};

module.exports = authenticate;
