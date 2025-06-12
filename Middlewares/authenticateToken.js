// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../Routes/login'); // ya da config dosyasından al

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Token bulunamadı' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Geçersiz token' });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
