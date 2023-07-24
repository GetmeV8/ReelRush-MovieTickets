const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {

  const Authtoken = req.headers.authorization
 
  const token = Authtoken && Authtoken.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;