import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';

// Middleware для ограничения количества запросов
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // ограничение для каждого IP до 100 запросов за windowMs
  message: 'Слишком много запросов с этого IP, попробуйте снова позже.'
});

// Middleware для ограничения количества запросов для аутентификации
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // ограничение для каждого IP до 5 запросов за windowMs
  message: 'Слишком много попыток входа, попробуйте снова позже.'
});

// Middleware для добавления HTTP заголовков безопасности
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", `http://localhost:${process.env.FRONTEND_PORT || '3000'}`, "https://*.tile.openstreetmap.org"]
    }
  }
});

// Валидация email
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Валидация пароля
export function validatePassword(password) {
  // Минимум 8 символов, одна заглавная буква, одна строчная буква и одна цифра
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
}