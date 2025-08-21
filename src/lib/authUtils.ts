import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Соль для хеширования паролей
const SALT_ROUNDS = 12;

// Секрет для JWT (в production должно храниться в переменных окружения)
const JWT_SECRET = process.env.JWT_SECRET || 'aigain-jwt-secret-key-for-development';

/**
 * Хеширование пароля
 * @param password - Пароль в открытом виде
 * @returns Хешированный пароль
 */
async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Проверка пароля
 * @param password - Пароль в открытом виде
 * @param hashedPassword - Хешированный пароль
 * @returns Результат проверки
 */
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

/**
 * Генерация JWT токена
 * @param userId - ID пользователя
 * @param email - Email пользователя
 * @returns JWT токен
 */
function generateToken(userId: number, email: string): string {
  return jwt.sign(
    { 
      userId, 
      email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 часа
    }, 
    JWT_SECRET
  );
}

/**
 * Проверка JWT токена
 * @param token - JWT токен
 * @returns Декодированный токен
 * @throws Ошибка если токен недействителен
 */
function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken
};