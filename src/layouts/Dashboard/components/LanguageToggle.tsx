import { Box, Button, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
    accentColor: string;
    isDark: boolean;
    language: 'ES' | 'EN';
    onToggle: (next: 'ES' | 'EN') => void;
}

const LanguageToggle = ({ accentColor, isDark, language, onToggle }: LanguageToggleProps) => {
    const { t } = useTranslation();

    return (
        <Box sx={{ position: 'fixed', bottom: { xs: 70, md: 100 }, right: 30, zIndex: 100 }}>
            <Button
                onClick={() => {
                    const next = language === 'ES' ? 'EN' : 'ES';
                    onToggle(next);
                }}
                sx={{
                    fontFamily: 'Datatype',
                    fontSize: '1rem',
                    color: accentColor,
                    border: '2px solid',
                    borderColor: alpha(accentColor, 0.6),
                    borderRadius: 0,
                    backgroundColor: alpha(accentColor, 0.08),
                    backdropFilter: 'blur(5px)',
                    px: 3,
                    py: 1.5,
                    '&:hover': {
                        backgroundColor: accentColor,
                        color: isDark ? '#000' : '#fff',
                        boxShadow: `0 0 25px ${alpha(accentColor, 0.5)}`
                    }
                }}
            >
                {t('dashboard.lng', { lang: language })}
            </Button>
        </Box>
    );
};

export default LanguageToggle;
