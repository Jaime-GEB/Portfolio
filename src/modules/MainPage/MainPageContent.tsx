import { Box, Button, useTheme } from '@mui/material';
import BgTxt from './components/BgTxt';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlitchText } from '../../components/shared/GlitchText';

const MainPageContent = () => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Background text decoration */}
            <BgTxt />

            <Button 
                onClick={() => navigate('/menu')}
                sx={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '100vh',
                    minWidth: '100vw',
                    backgroundColor: 'transparent',
                    p: { xs: 2, md: 4 },
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}>
                <Box sx={{ textAlign: 'center', maxWidth: '90%' }}>
                    <GlitchText 
                        text="Jaime Gómez-Estrada Berrouet"
                        variant='h1'
                        color='text.secondary'
                        sx={{ 
                            fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
                            wordBreak: 'break-word',
                            "&:hover": { color: 'primary.main' }
                        }}
                    />
                    <GlitchText 
                        text={t('main.subtitle')}
                        variant='h2'
                        color='text.secondary'
                        sx={{ 
                            fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.5rem' },
                            mt: 1,
                            "&:hover": { color: 'primary.main' }
                        }}
                    />
                </Box>
                <Box sx={{ position: 'absolute', bottom: { xs: 40, md: 60 }, textAlign: 'center', width: '100%' }}>
                    <GlitchText 
                        text={t('main.click_continue')}
                        variant='body2'
                        sx={{
                            fontSize: { xs: '0.9rem', md: '1.2rem' },
                            letterSpacing: '0.2em',
                            opacity: isDark ? 0.7 : 0.9,
                            color: isDark ? 'text.secondary' : 'text.primary',
                            fontWeight: isDark ? 400 : 700,
                            "&:hover": { color: 'primary.main', opacity: 1 }
                        }}
                    />
                </Box>
            </Button>
        </Box>
    );
};

export default MainPageContent;
