import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface EasterEggOverlayProps {
    visible: boolean;
    image: string;
    accentColor: string;
    onClose: () => void;
}

const EasterEggOverlay = ({ visible, image, accentColor, onClose }: EasterEggOverlayProps) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {visible && (
                <Box 
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    sx={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 10000,
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer'
                    }}
                >
                    <motion.img 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 45 }}
                        transition={{ type: 'spring', damping: 15 }}
                        src={image}
                        alt="Easter Egg"
                        style={{ maxWidth: '85%', maxHeight: '85%', borderRadius: '12px', border: `2px solid ${accentColor}` }}
                    />
                    <Typography sx={{ position: 'absolute', bottom: 40, color: 'white', fontFamily: 'Doto', fontSize: '1.2rem', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        {t('dashboard.click_close')}
                    </Typography>
                </Box>
            )}
        </AnimatePresence>
    );
};

export default EasterEggOverlay;
