// Локальное хранилище пользователей в памяти
// В реальном приложении это будет заменено на серверное API

interface User {
  id: string;
  email: string;
  password: string; // В реальном приложении пароль должен храниться в зашифрованном виде
  login: string;
  offer: string;
}

// Имитация базы данных в памяти
let users: User[] = [];

// Инициализация с тестовым пользователем
users = [
  {
    id: "1",
    email: "demo@aigain.ru",
    password: "demo123",
    login: "Демо Пользователь",
    offer: ""
  }
];

export const localStorageClient = {
  // Регистрация нового пользователя
  registerUser: (email: string, password: string, login: string, offer: string): User | null => {
    // Проверяем, что пользователя с таким email еще нет
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return null;
    }

    // Создаем нового пользователя
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      email,
      password,
      login,
      offer
    };

    // Добавляем пользователя в "базу данных"
    users.push(newUser);
    
    return newUser;
  },

  // Поиск пользователя по email и паролю
  findUser: (email: string, password: string): User | null => {
    const user = users.find(user => user.email === email && user.password === password);
    return user || null;
  },

  // Поиск пользователя по email
  findUserByEmail: (email: string): User | null => {
    const user = users.find(user => user.email === email);
    return user || null;
  }
};