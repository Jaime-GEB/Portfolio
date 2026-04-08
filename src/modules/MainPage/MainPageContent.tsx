import { Box, Typography, Button } from '@mui/material';
import BgTxt from './components/BgTxt';
import { useGlitchText } from '../../hooks/useGlitchText';
import { useNavigate } from 'react-router-dom';

const MainPageContent = () => {
    const navigate = useNavigate();
    // Aplicamos el efecto de glitch al nombre principal
    const { 
        renderGlitchedText: renderName, 
        handleMouseEnter: onNameEnter, 
        handleMouseLeave: onNameLeave 
    } = useGlitchText("Jaime Gómez-Estrada Berrouet");

    // Aplicamos el efecto de glitch al subtítulo
    const {
        renderGlitchedText: renderSub,
        handleMouseEnter: onSubEnter,
        handleMouseLeave: onSubLeave
    } = useGlitchText("Desarrollador Web");

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
                    <Typography 
                        variant='h1'
                        color='text.secondary'
                        onMouseEnter={onNameEnter}
                        onMouseLeave={onNameLeave}
                        sx={{ 
                            cursor: 'default',
                            transition: 'color 0.3s ease',
                            fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
                            wordBreak: 'break-word',
                            "&:hover": { color: 'primary.main' }
                        }}
                    >
                        {renderName()}
                    </Typography>
                    <Typography 
                        variant='h2'
                        color='text.secondary'
                        onMouseEnter={onSubEnter}
                        onMouseLeave={onSubLeave}
                        sx={{ 
                            cursor: 'default',
                            transition: 'color 0.3s ease',
                            fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.5rem' },
                            mt: 1,
                            "&:hover": { color: 'primary.main' }
                        }}
                    >
                        {renderSub()}
                    </Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: { xs: 40, md: 60 }, textAlign: 'center', width: '100%' }}>
                    <Typography 
                        variant='body2'
                        onMouseEnter={onSubEnter}
                        onMouseLeave={onSubLeave}
                        sx={{
                            transition: 'color 0.3s ease',
                            fontSize: { xs: '0.9rem', md: '1.2rem' },
                            letterSpacing: '0.2em',
                            opacity: 0.7,
                            "&:hover": { color: 'primary.main', opacity: 1 }
                        }}
                    >
                        PULSA PARA CONTINUAR
                    </Typography>
                </Box>
            </Button>
        </Box>
    );
};

export default MainPageContent;
