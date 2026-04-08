import type { ErrorResponse } from '../../providers/NotificationProvider/context/NotificationContext';
import axios, { type AxiosError, type AxiosInstance } from 'axios';

// Clase de servicio para realizar peticiones HTTP a la API de Ibio
export class ApiService<ItemType, ResponseType = ItemType> {
    protected api: AxiosInstance;
    protected endpoint: string;
    protected baseURL: string;
    protected headers: any;
    protected credentials: boolean;

    constructor(endpoint?: string, credentials?: boolean, headers?: any) {
        this.endpoint = endpoint ?? '';
        this.baseURL = import.meta.env.VITE_APP_API_URL;
        this.headers = headers ?? { 'Content-Type': 'application/json'};
        this.credentials = credentials ?? false;

        this.api = axios.create({
            baseURL: this.baseURL,
            withCredentials: this.credentials,
            headers: this.headers,
        });

        this.api.interceptors.response.use(
            (response) => response.data, // Retornar directamente la data de la respuesta
            (error: AxiosError) => {
                const errorData = error.response?.data as any || {};

                // Creamos el ErrorResponse estructurado siguiendo tu patrón actual
                const errorResponse: ErrorResponse = {
                    status: errorData.status || error.response?.status || 500,
                    error: errorData.error || error.code || 'Error',
                    message: errorData.message || error.message || 'An unexpected error occurred',
                    path: errorData.path || error.config?.url || ''
                }
                return Promise.reject(errorResponse);
            }
        );
    }

    protected parseResponse(data: any): ItemType {
        return this.parseItemResponse(data);
    }
    protected parseItemResponse(data: any): ItemType {
        return data as unknown as ItemType; // Implementación por defecto, puede ser sobrescrita
    }

    protected async handleRequest<R>(
        request: Promise<any>,
        isArray: boolean = false,
    ): Promise<R> {
        try {
            const response = await request;
            
            // Handle array extraction if needed
            if (isArray && response && typeof response === 'object' && !Array.isArray(response)) {
                if ('data' in response) {
                    return response.data as R;
                }
            }
            
            return response as R;
        } catch (error) {
            console.error('Error in API request:', error);
            throw error;
        }
    }

    get(endpoint: string = this.endpoint, headers: any = this.headers): Promise<ItemType> {
        return this.handleRequest<ItemType>(this.api.get(endpoint, { headers }), true)
            .then((data) => (data));
    }

    post(body: any, endpoint: string = this.endpoint, headers?: any): Promise<ItemType> {
        return this.handleRequest<ResponseType>(this.api.post(endpoint, body, { headers }))
            .then((data) => this.parseResponse(data));
    }

    put(body: any, endpoint: string = this.endpoint, headers?: any): Promise<ItemType> {
        return this.handleRequest<ResponseType>(this.api.put(endpoint, body, { headers }))
            .then((data) => this.parseResponse(data));
    }

    patch(body: any, endpoint: string = this.endpoint, headers?: any): Promise<ItemType> {
        return this.handleRequest<ResponseType>(this.api.patch(endpoint, body, { headers }))
            .then((data) => this.parseResponse(data));
    }

    delete(endpoint: string, headers?: any): Promise<ItemType> {
        return this.handleRequest<ResponseType>(this.api.delete(endpoint, { headers }))
            .then((data) => this.parseResponse(data));
    }
}