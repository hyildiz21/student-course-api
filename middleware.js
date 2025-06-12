const jwt = require('jsonwebtoken');

// Middleware: Token kontrolü
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token gerekli' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Geçersiz token' });
    req.user = user;
    next();
  });
}
