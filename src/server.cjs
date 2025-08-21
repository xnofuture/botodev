const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sqliteEncryptedClient } = require('./lib/sqliteEncryptedClient.cjs');
const { verifyToken } = require('./lib/authUtils.cjs');
const { rateLimiter, authRateLimiter, securityHeaders } = require('./lib/security.cjs');
const { validateEmail, validatePassword } = require('./lib/security.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware безопасности
app.use(securityHeaders);
app.use(rateLimiter);

// Middleware
app.use(cors());
app.use(express.json());

// Секрет для JWT (в production должен храниться в переменных окружения)
const JWT_SECRET = process.env.JWT_SECRET || 'aigain-jwt-secret-for-development';

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен доступа отсутствует' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Недействительный токен' });
  }
};

// Маршрут для регистрации пользователя
app.post('/api/register', authRateLimiter, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Проверяем, что все поля заполнены
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    // Валидация email и пароля
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Неверный формат email' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ 
        error: 'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву и одну цифру' 
      });
    }

    // Проверяем, что пользователь с таким email не существует
    const existingUser = await sqliteEncryptedClient.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Создаем нового пользователя
    const newUser = await sqliteEncryptedClient.registerUser({
      email,
      password,
      login: name,
      offer: ''
    });

    if (!newUser) {
      return res.status(500).json({ error: 'Ошибка регистрации пользователя' });
    }

    // Генерируем JWT токен
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Регистрация успешна',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.login
      },
      token
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Маршрут для входа пользователя
app.post('/api/login', authRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверяем, что все поля заполнены
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны для заполнения' });
    }

    // Валидация email
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Неверный формат email' });
    }

    // Проверяем учетные данные пользователя
    const user = await sqliteEncryptedClient.validateUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // Генерируем JWT токен
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Вход выполнен успешно',
      user: {
        id: user.id,
        email: user.email,
        name: user.login
      },
      token
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Маршрут для проверки токена
app.get('/api/verify-token', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Токен действителен',
    user: req.user
  });
});

// Маршрут для выхода
app.post('/api/logout', (req, res) => {
  // В реальном приложении здесь можно было бы добавить логику для инвалидации токена
  res.json({ message: 'Выход выполнен успешно' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;