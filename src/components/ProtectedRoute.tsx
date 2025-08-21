import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { verifyToken } from '@/lib/authUtils';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

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

          if (!response.ok) {
            // Если токен недействителен, удаляем его
            localStorage.removeItem('aigain_token');
          }
        } catch (error) {
          // Если произошла ошибка, удаляем токен
          localStorage.removeItem('aigain_token');
        }
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;