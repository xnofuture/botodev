import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { hashPassword, verifyPassword } from './authUtils';

// Создаем директорию db если её нет
const dbDir = path.join(__dirname, '../../db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Путь к файлу базы данных
const dbPath = path.join(dbDir, 'personal.db');

// Создаем базу данных
const db = new Database(dbPath);

// Создаем таблицу пользователей если её нет
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    login TEXT NOT NULL,
    offer TEXT
  )
`);

export interface User {
  id: number;
  email: string;
  password: string;
  login: string;
  offer: string;
}

export interface NewUser {
  email: string;
  password: string;
  login: string;
  offer: string;
}

// Обновленный интерфейс для пользователя без пароля
export interface PublicUser {
  id: number;
  email: string;
  login: string;
  offer: string;
}

export const sqliteClient = {
  // Регистрация нового пользователя
  registerUser: async (userData: NewUser): Promise<User | null> => {
    try {
      // Хешируем пароль перед сохранением
      const hashedPassword = await hashPassword(userData.password);
      
      const stmt = db.prepare(`
        INSERT INTO users (email, password, login, offer)
        VALUES (?, ?, ?, ?)
      `);
      
      const result = stmt.run(
        userData.email,
        hashedPassword,
        userData.login,
        userData.offer
      );
      
      // Возвращаем созданного пользователя без пароля
      const getUserStmt = db.prepare('SELECT id, email, login, offer FROM users WHERE id = ?');
      return getUserStmt.get(result.lastInsertRowid) as PublicUser;
    } catch (error) {
      console.error('Ошибка регистрации пользователя:', error);
      return null;
    }
  },

  // Поиск пользователя по email
  findUserByEmail: (email: string): User | null => {
    try {
      const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
      return stmt.get(email) as User || null;
    } catch (error) {
      console.error('Ошибка поиска пользователя:', error);
      return null;
    }
  },

  // Проверка учетных данных пользователя
  validateUser: async (email: string, password: string): Promise<User | null> => {
    try {
      // Сначала находим пользователя по email
      const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
      const user = stmt.get(email) as User || null;
      
      // Если пользователь найден, проверяем пароль
      if (user) {
        const isValid = await verifyPassword(password, user.password);
        return isValid ? user : null;
      }
      
      return null;
    } catch (error) {
      console.error('Ошибка проверки учетных данных:', error);
      return null;
    }
  }
};