import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, AuthContextType, LoginForm, RegisterForm } from '@/types/auth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser, removeUser] = useLocalStorage<User | null>('aigain_user', null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем токен при монтировании компонента
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('aigain_token');
      if (token) {
        try {
          // Отправляем запрос на бэкенд для проверки токена
          const response = await fetch('/api/verify-token', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            // Если токен действителен, получаем данные пользователя
            const result = await response.json();
            const userData: User = {
              id: result.user.userId.toString(),
              email: result.user.email,
              name: result.user.name || 'Пользователь',
              avatar: '',
              createdAt: new Date().toISOString(),
            };
            setUser(userData);
          } else {
            // Если токен недействителен, удаляем его
            localStorage.removeItem('aigain_token');
            removeUser();
          }
        } catch (error) {
          // Если произошла ошибка, удаляем токен
          localStorage.removeItem('aigain_token');
          removeUser();
        }
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  const login = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Отправляем запрос на бэкенд
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Ошибка входа');
      }

      // Преобразуем данные пользователя в нужный формат
      const loggedInUser: User = {
        id: result.user.id.toString(),
        email: result.user.email,
        name: result.user.name,
        avatar: '',
        createdAt: new Date().toISOString(), // Устанавливаем текущую дату
      };

      // Сохраняем токен в localStorage
      localStorage.setItem('aigain_token', result.token);

      setUser(loggedInUser);
      toast.success('Добро пожаловать в AIGain!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка входа');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      // Отправляем запрос на бэкенд
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Ошибка регистрации');
      }

      // Преобразуем данные пользователя в нужный формат
      const registeredUser: User = {
        id: result.user.id.toString(),
        email: result.user.email,
        name: result.user.name,
        avatar: '',
        createdAt: new Date().toISOString(), // Устанавливаем текущую дату
      };

      // Сохраняем токен в localStorage
      localStorage.setItem('aigain_token', result.token);

      setUser(registeredUser);
      toast.success('Регистрация успешна! Добро пожаловать!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка регистрации');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeUser();
    // Удаляем токен из localStorage
    localStorage.removeItem('aigain_token');
    toast.success('Вы успешно вышли из системы');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
