import { type ReactNode } from 'react';
import { Box, Paper } from '@mui/material';

// Interfaz para las propiedades del layout modal
interface ModalProps {
    children: ReactNode;
    minWidth?: string | number;
    onClose?: () => void;
}

// Componente de layout para modales con fondo oscurecido y centrado
const MyModal = ({ children, minWidth, onClose }: ModalProps) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1300,
                backdropFilter: 'blur(3px)',
            }}
            onClick={onClose}
        >
            <Paper
                elevation={24}
                sx={{
                    position: 'relative',
                    maxWidth: '90vw',
                    minWidth: minWidth || 800,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                    m: 2,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default MyModal;
