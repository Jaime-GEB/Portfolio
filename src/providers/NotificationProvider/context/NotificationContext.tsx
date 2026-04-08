import { createContext } from 'react';
import type { AlertColor } from '@mui/material';

// Interfaz para la estructura de respuesta de error
export interface ErrorResponse {
    status: number;
    error: string;
    message: string;
    path: string;
}

// Interfaz que define el tipo de datos y funciones expuestas por el contexto de notificaciones
export interface NotificationContextType {
    showNotification: (msg: string | ErrorResponse, sev?: AlertColor) => void;
    showErrorNotification: (error: ErrorResponse) => void;
}

// Creación del contexto con valor inicial indefinido
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

