
import { useContext } from 'react';
import { NotificationContext } from '../../providers/NotificationProvider/context/NotificationContext';

// Hook personalizado para acceder fácilmente al contexto de notificaciones
export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
  }
  return ctx;
};
/*
Ejemplo de uso en un componente:
  
  const { showNotification } = useNotification();
  try {
      await api.delete(`/v1/admin/api-error-logs/${id}`);
      showNotification('Log deleted successfully', 'success');
      refetch();
    } catch (error: any) {
      showNotification(error);
    }

*/
