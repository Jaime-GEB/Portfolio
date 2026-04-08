import { useState, useEffect } from 'react';
import { Box, Typography, Button, LinearProgress, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuGrid from './components/MenuGrid';

const MenuContent = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isDark = theme.palette.mode === 'dark';
    
    const fullName = "Jaime Gómez-Estrada Berrouet";
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    // Efecto de mecanografía robusto
    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            // Usamos slice para asegurar que siempre mostramos la cadena correcta hasta el índice i
            setDisplayText(fullName.slice(0, i + 1));
            i++;
            
            if (i >= fullName.length) {
                clearInterval(typingInterval);
            }
        }, 100);

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <Box 
            sx={{ 
                position: 'relative', 
                width: '100%', 
                minHeight: '100vh', 
                backgroundColor: 'background.default',
                p: { xs: 2, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                overflowY: 'auto',
                // Fondo con rejilla dinámico según el tema
                backgroundImage: `
                    linear-gradient(${alpha(isDark ? theme.palette.primary.main : theme.palette.divider, 0.05)} 1px, transparent 1px),
                    linear-gradient(90deg, ${alpha(isDark ? theme.palette.primary.main : theme.palette.divider, 0.05)} 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: isDark 
                        ? 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))'
                        : 'linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.02) 50%)',
                    backgroundSize: '100% 2px, 3px 100%',
                    pointerEvents: 'none',
                    zIndex: 2,
                    opacity: isDark ? 0.3 : 0.15
                }
            }}
        >
            {/* Nav Header (Back Button + CMD) */}
            <Box sx={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                    onClick={() => navigate('/')}
                    sx={{
                        alignSelf: 'flex-start',
                        color: 'primary.main',
                        fontFamily: 'Doto',
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        letterSpacing: '0.1em',
                        border: '1px solid',
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        px: { xs: 0.5, sm: 2 },
                        py: { xs: 0.5, sm: 1 },
                        '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.2)}`
                        }
                    }}
                >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{"< RETURN_TO_BASE"}</Box>
                    <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>{"< BACK"}</Box>
                </Button>

                <Box sx={{ alignSelf: 'flex-start', mt: { xs: 0, md: 1 }, width: '100%' }}>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontFamily: 'monospace', 
                            color: 'primary.main',
                            fontSize: { xs: '1rem', sm: '1.43rem', md: '1.8rem' },
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            fontWeight: 'bold',
                            textShadow: isDark ? `0 0 10px ${alpha(theme.palette.primary.main, 0.4)}` : 'none',
                            lineHeight: 1.2
                        }}
                    >
                        <Box component="span" sx={{ opacity: 0.6, mr: 1 }}>C:\USERS\JAIGOBE\</Box>
                        <Box component="span">{displayText}</Box>
                        <span style={{ 
                            display: 'inline-block', 
                            width: '8px', 
                            height: '1.1em', 
                            backgroundColor: 'currentColor', 
                            marginLeft: '4px',
                            opacity: showCursor ? 1 : 0 
                        }} />
                    </Typography>
                </Box>
            </Box>

            {/* Rotating Grid (Center) */}
            <Box 
                sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    zIndex: 1
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                    <MenuGrid />
                </motion.div>
            </Box>

            {/* Redesigned Footer System Status Bar */}
            <Box 
                sx={{ 
                    position: { xs: 'relative', md: 'absolute' }, 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    p: 2,
                    px: { xs: 2, md: 4 },
                    mt: { xs: 4, md: 0 },
                    zIndex: 3,
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1,
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    borderTop: '1px solid',
                    borderColor: theme.palette.divider,
                    backdropFilter: 'blur(8px)'
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between', 
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 1, sm: 0 }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
                        <Typography sx={{ fontFamily: 'Datatype', fontSize: '0.75rem', color: 'primary.main', fontWeight: 'bold' }}>
                            SYS_STATUS: OPERATIONAL [OK]
                        </Typography>
                        <Box sx={{ width: { xs: 80, sm: 120 } }}>
                            <LinearProgress 
                                variant="determinate" 
                                value={100} 
                                sx={{ 
                                    height: 4, 
                                    borderRadius: 0,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    '& .MuiLinearProgress-bar': { backgroundColor: 'primary.main', opacity: 0.8 }
                                }} 
                            />
                        </Box>
                        <Typography sx={{ 
                            fontFamily: 'monospace', 
                            fontSize: '0.7rem', 
                            color: 'text.secondary', 
                            opacity: 0.7,
                            display: { xs: 'none', md: 'block' } 
                        }}>
                            0xFF2A_MODE_ROTATION_LIT
                        </Typography>
                    </Box>
                    
                    <Typography 
                        sx={{ 
                            fontFamily: 'Datatype', 
                            fontSize: '0.7rem', 
                            color: 'text.secondary',
                            letterSpacing: '0.1em'
                        }}
                    >
                        ESTRADA_CORE_NET // © 2026
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MenuContent;
