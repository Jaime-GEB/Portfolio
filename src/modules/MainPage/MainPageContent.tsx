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
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                        variant='h1'
                        color='text.secondary'
                        onMouseEnter={onNameEnter}
                        onMouseLeave={onNameLeave}
                        sx={{ 
                            cursor: 'default',
                            transition: 'color 0.3s ease',
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
                            "&:hover": { color: 'primary.main' }
                        }}
                    >
                        {renderSub()}
                    </Typography>
                </Box>
                <Box sx={{ justifyContent: 'end', alignItems: 'end', width: '100%', height: '100%' }}>
                    <Typography 
                        variant='body2'
                        onMouseEnter={onSubEnter}
                        onMouseLeave={onSubLeave}
                        sx={{
                            transition: 'color 0.3s ease',
                            "&:hover": { color: 'primary.main' }
                        }}
                    >
                        Pulsa para continuar
                    </Typography>
                </Box>
            </Button>
        </Box>
    );
};

export default MainPageContent;
