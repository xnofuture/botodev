import { sqliteEncryptedClient } from './lib/sqliteEncryptedClient.js';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные окружения из .env

async function readAllUsers() {
  try {
    // Убедись, что DB_KEY установлен в твоем .env файле
    // Например: DB_KEY="твой-секретный-ключ-для-бд"
    const users = await sqliteEncryptedClient.getAllUsers();
    console.log('Все пользователи:', users);
  } catch (error) {
    console.error('Ошибка при чтении всех пользователей:', error);
  }
}

readAllUsers();