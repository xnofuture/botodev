import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sqliteEncryptedClient } from './lib/sqliteEncryptedClient.js';
import { verifyToken } from './lib/authUtils.js';
import { rateLimiter, authRateLimiter, securityHeaders, validateEmail, validatePassword } from './lib/security.js';

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
const authenticateToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен доступа отсутствует' });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Недействительный токен' });
  }
};

// Маршрут для регистрации пользователя
app.post('/api/register', authRateLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // Проверяем, что все поля заполнены
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }

    try {
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
      // Возвращаем детализированную ошибку из sqliteEncryptedClient
      const status = error.error === 'Ошибка регистрации пользователя' ? 400 : 500;
      res.status(status).json({ error: error.error, details: error.details });
    }
  } catch (error) {
    console.error('Неожиданная ошибка регистрации:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Маршрут для входа пользователя
app.post('/api/login', authRateLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Проверяем, что все поля заполнены
    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны для заполнения' });
    }

    try {
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
      // Возвращаем детализированную ошибку из sqliteEncryptedClient
      res.status(500).json({ error: error.error, details: error.details });
    }
  } catch (error) {
    console.error('Неожиданная ошибка входа:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Маршрут для получения данных пользователя (защищенный)
app.get('/api/user', authenticateToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    
    // Получаем данные пользователя из базы данных
    // В данном случае мы можем просто вернуть данные из токена
    // В реальном приложении здесь может быть дополнительная логика
    const user = (req as any).user;
    
    res.json({
      user: {
        id: user.userId,
        email: user.email,
        name: user.name || 'Пользователь'
      }
    });
  } catch (error) {
    console.error('Ошибка получения данных пользователя:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Маршрут для проверки токена
app.get('/api/verify-token', authenticateToken, (req: Request, res: Response) => {
  res.json({ valid: true, user: (req as any).user });
});


export default app;