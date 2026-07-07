import axios from "axios";

// ✅ 1. Базовый URL и настройки
const baseURL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Для отправки cookies (refresh token)
});

// ✅ 2. Управление токеном с localStorage
let accessToken: string | null = null;

export const tokenManager = {
  getToken: (): string | null => {
    // Проверяем память → если нет, берем из localStorage
    if (!accessToken && typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken');
    }
    return accessToken;
  },
  
  setToken: (token: string): void => {
    accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  },
  
  removeToken: (): void => {
    accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  },
};

// ✅ 3. Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 4. Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // ✅ Правильный статус: 401, а не 403
    // ✅ Проверка на повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // ✅ withCredentials автоматически отправит refresh token из cookies
        const response = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
        });
        
        const newToken = response.data.accessToken;
        tokenManager.setToken(newToken);
        
        // ✅ Повторяем оригинальный запрос
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        // ✅ Обработка ошибки обновления
        tokenManager.removeToken();
        
        // ✅ Перенаправление на логин
        if (typeof window !== 'undefined') {
          window.location.href = '/signin';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;