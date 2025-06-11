const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Sabit JWT secret anahtarı (gizli tut!)
const JWT_SECRET = 'mySuperSecretKey123'; // İleride bu değer config dosyasına taşınabilir

// Örnek kullanıcılar
const users = [
  { id: 1, username: 'admin', password: '1234' }
];

// POST /auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
  }

  const token = jwt.sign(
    { username: user.username, id: user.id },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = { router, JWT_SECRET }; // JWT_SECRET dışa aktarılacak çünkü diğer dosyada lazım olacak
