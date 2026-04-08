import { useState, useCallback, useMemo, type ReactNode } from 'react';
import {Snackbar, Alert, AlertTitle, type AlertColor } from '@mui/material';
import { NotificationContext, type ErrorResponse } from './context/NotificationContext';

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  // Estados para controlar la visibilidad y contenido del Snackbar
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState<string | null>(null);
  const [severity, setSeverity] = useState<AlertColor>('success');

  // Función para mostrar notificaciones generales
  const showNotification = useCallback(
    (msg: string | ErrorResponse, sev: AlertColor = 'success') => {
      if (typeof msg === 'string') {
        // Manejo de mensajes simples de texto
        setMessage(msg);
        setTitle(null);
        setSeverity(sev);
      } else {
        // Manejo de objetos de error (ErrorResponse)
        setTitle(`Error ${msg.status}: ${msg.error}`);
        setMessage(`${msg.message}${msg.path ?? ''}`);
        setSeverity('error');
      }
      setOpen(true);
    },
    []
  );

  // Función específica para mostrar notificaciones de error
  const showErrorNotification = useCallback((error: ErrorResponse) => {
    setTitle(`Error ${error.status}: ${error.error}`);
    setMessage(`${error.message}${error.path ?? ''}`);
    setSeverity('error');
    setOpen(true);
  }, []);

  // Memorización del valor del contexto para evitar renderizados innecesarios
  const value = useMemo(
    () => ({ showNotification, showErrorNotification }),
    [showNotification, showErrorNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000} // Se cierra automáticamente a los 5 segundos
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%', minWidth: 300 }}>
          {title && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
