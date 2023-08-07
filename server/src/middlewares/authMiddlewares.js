const jwt = require('jsonwebtoken');
function authMiddleware(req, res, next) {
  const Authtoken = req.headers.authorization
  const token = Authtoken && Authtoken.split(' ')[1];
  console.log(token, Authtoken)
  if (!token) {
    console.log("header is missing man")
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  try {
    console.log(Authtoken)
    const decoded = jwt.verify(token, 'secret');
    console.log("00000",req.user)
    req.user = decoded;
    console.log("00000000",decoded)
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    // Handle other types of errors as needed
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

module.exports = authMiddleware;