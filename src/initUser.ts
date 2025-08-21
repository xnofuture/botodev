import { sqliteEncryptedClient } from './lib/sqliteEncryptedClient.js';

async function initUser() {
  try {
    const email = 'lolotopik@gmail.com';
    const existingUser = await sqliteEncryptedClient.findUserByEmail(email);
    
    if (!existingUser) {
      await sqliteEncryptedClient.registerUser({
        email: email,
        password: 'S@nycoyoyo100714',
        login: 'lolotopik',
        offer: ''
      });
      console.log('Пользователь lolotopik успешно добавлен в базу данных');
    } else {
      console.log('Пользователь lolotopik уже существует в базе данных');
    }
  } catch (error) {
    console.error('Ошибка инициализации пользователя:', error);
  }
}

initUser();