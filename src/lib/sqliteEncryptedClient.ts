import sqlite3 from '@journeyapps/sqlcipher'; // Для шифрования
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { hashPassword, verifyPassword } from './authUtils.js'; // Добавлено расширение .js

dotenv.config();

// Получение __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к БД из .env или дефолтный
const dbDir = path.join(__dirname, '/bd');
try {
  fs.accessSync(dbDir);
} catch {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(dbDir, 'personal.db');

let db: any = null;

/**
 * Инициализация зашифрованной базы данных
 */
async function initEncryptedDB(): Promise<any> {
  if (db) {
    return db;
  }

  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
      if (err) {
        console.error('Ошибка открытия базы данных', err);
        reject(err);
        return;
      }

      // Установка ключа шифрования
      db.run(`PRAGMA key = "${process.env.DB_KEY || 'your-default-secure-key'}";`, (err: Error | null) => {
        if (err) {
          console.error('Ошибка установки ключа шифрования', err);
          reject(err);
          return;
        }

        // Создание таблицы пользователей
        db.run(`
          CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            login TEXT NOT NULL,
            offer TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err: Error | null) => {
          if (err) {
            console.error('Ошибка создания таблицы', err);
            reject(err);
          } else {
            resolve(db);
          }
        });
      });
    });
  });
}

export const sqliteEncryptedClient = {
  /**
   * Регистрация нового пользователя
   */
  async registerUser(userData: { email: string; password: string; login: string; offer: string }): Promise<any> {
    try {
      await initEncryptedDB();
      
      const hashedPassword = await hashPassword(userData.password);
      
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (email, password, login, offer)
           VALUES (?, ?, ?, ?)`,
          [userData.email, hashedPassword, userData.login, userData.offer],
          function (err: Error | null) {
            if (err) {
              console.error('Ошибка регистрации пользователя:', err);
              reject({ error: 'Ошибка регистрации пользователя', details: err.message });
              return;
            }
            
            db.get(
              'SELECT id, email, login, offer FROM users WHERE id = ?',
              [this.lastID],
              (err: Error | null, row: any) => {
                if (err) {
                  console.error('Ошибка получения пользователя:', err);
                  reject({ error: 'Ошибка получения пользователя', details: err.message });
                } else if (!row) {
                  reject({ error: 'Пользователь не найден после создания' });
                } else {
                  resolve(row);
                }
              }
            );
          }
        );
      });
    } catch (error) {
      console.error('Ошибка регистрации пользователя:', error);
      throw { error: 'Внутренняя ошибка сервера', details: error.message };
    }
  },

  /**
   * Поиск пользователя по email
   */
  async findUserByEmail(email: string): Promise<any> {
    try {
      await initEncryptedDB();
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err: Error | null, row: any) => {
          if (err) {
            console.error('Ошибка поиска пользователя:', err);
            reject(err);
          } else {
            resolve(row || null);
          }
        });
      });
    } catch (error) {
      console.error('Ошибка поиска пользователя:', error);
      throw error;
    }
  },

  /**
   * Проверка учетных данных пользователя
   */
  async validateUser(email: string, password: string): Promise<any> {
    try {
      await initEncryptedDB();
      
      const user = await this.findUserByEmail(email);
      if (!user) {
        return null;
      }
      
      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return null;
      }
      
      const { password: _, ...publicUser } = user;
      return publicUser;
    } catch (error) {
      console.error('Ошибка проверки учетных данных:', error);
      throw { error: 'Внутренняя ошибка сервера', details: error.message };
    }
  }
};