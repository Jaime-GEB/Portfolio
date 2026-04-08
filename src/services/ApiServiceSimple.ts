import type { ErrorResponse } from '../providers/NotificationProvider/context/NotificationContext';
import axios, { type AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response) => response.data, // Retornar directamente la data de la respuesta
    (error: AxiosError) => {
        const errorData = error.response?.data as any || {};

        // Creamos el ErrorResponse
        const errorResponse: ErrorResponse = {
            status: errorData.status || error.response?.status || 500,
            error: errorData.error || error.code || 'Error',
            message: errorData.message || error.message || 'An unexpected error occurred',
            path: errorData.path || error.config?.url || ''
        }
        return Promise.reject(errorResponse);
    }
);

// Clase de servicio para realizar peticiones HTTP a la API de Ibio
class ApiService {
    // Método privado para realizar peticiones HTTP genéricas

    get<T>(endpoint: string, headers?: any): Promise<T> {
        return instance.get<any, T>(endpoint, { headers });
    }

    post<T>(endpoint: string, body: any, headers?: any): Promise<T> {
        return instance.post<any, T>(endpoint, body, { headers });
    }

    put<T>(endpoint: string, body: any, headers?: any): Promise<T> {
        return instance.put<any, T>(endpoint, body, { headers });
    }

    patch<T>(endpoint: string, body: any, headers?: any): Promise<T> {
        return instance.patch<any, T>(endpoint, body, { headers });
    }

    delete<T>(endpoint: string, headers?: any): Promise<T> {
        return instance.delete<any, T>(endpoint, { headers });
    }
}

export const api = new ApiService();