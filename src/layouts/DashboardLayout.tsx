import { useState, useEffect, type ReactNode } from 'react';
import { Box, Typography, Button, LinearProgress, CircularProgress, useTheme, alpha, InputBase, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../components/main/ThemeSwitch';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isDark = theme.palette.mode === 'dark';
    const accentColor = theme.palette.primary.main;
    
    const fullName = "Jaime Gómez-Estrada Berrouet";
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    
    // New States
    const [systemLoad, setSystemLoad] = useState(0);
    const [language, setLanguage] = useState<'ES' | 'EN'>('ES');
    const [easterEgg, setEasterEgg] = useState<{ visible: boolean; image: string } | null>(null);

    // Flicker animation for retro progress bar
    const flickerAnim = keyframes`
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.3; }
        80% { opacity: 0.9; }
    `;

    // Efecto de mecanografía robusto
    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
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

    // Looping progress bar effect with variable speeds
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        let currentLoad = 0;
        let speed = Math.random() * 5 + 1; // Initial speed

        const updateProgress = () => {
            currentLoad += speed;
            if (currentLoad >= 100) {
                currentLoad = 0;
                speed = Math.random() * 8 + 1; // New random speed for the next loop
            }
            setSystemLoad(currentLoad);
            
            // Randomly "glitch" the interval too
            const nextInterval = Math.random() * 100 + 30; 
            timeoutId = setTimeout(updateProgress, nextInterval);
        };

        updateProgress();
        return () => clearTimeout(timeoutId);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDisplayText(val);
        
        const cleanVal = val.trim().toLowerCase();
        if (cleanVal === 'mondarina') {
            setEasterEgg({
                visible: true,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuB38sD1_UfeYI_Yb10Vm5LH82dsfiCQr2UA&s"
            });
        } else if (cleanVal === 'inade') {
            setEasterEgg({
                visible: true,
                image: "https://ih1.redbubble.net/image.5279114284.8907/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
            });
        }
    };

    return (
        <Box 
            sx={{ 
                position: 'relative', 
                width: '100%', 
                minHeight: '100vh', 
                backgroundColor: 'background.default',
                p: { xs: 2, md: 4 },
                pb: { xs: 8, md: 12 }, // Extra padding for footer
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                overflowY: 'auto',
                backgroundImage: `
                    linear-gradient(${alpha(accentColor, isDark ? 0.05 : 0.08)} 1px, transparent 1px),
                    linear-gradient(90deg, ${alpha(accentColor, isDark ? 0.05 : 0.08)} 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
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
            <ThemeToggle />

            {/* Easter Egg Overlay */}
            <AnimatePresence>
                {easterEgg?.visible && (
                    <Box 
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setEasterEgg(null)}
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
                            src={easterEgg.image}
                            alt="Easter Egg"
                            style={{ maxWidth: '85%', maxHeight: '85%', borderRadius: '12px', border: `2px solid ${accentColor}` }}
                        />
                        <Typography sx={{ position: 'absolute', bottom: 40, color: 'white', fontFamily: 'Doto', fontSize: '1.2rem', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                            [ CLICK ANYWHERE TO DISMISS ]
                        </Typography>
                    </Box>
                )}
            </AnimatePresence>

            {/* Nav Header (Back Button + CMD) */}
            <Box sx={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                    onClick={() => navigate(-1)}
                    sx={{
                        alignSelf: 'flex-start',
                        color: isDark ? 'primary.main' : 'text.primary',
                        fontFamily: 'Doto',
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        letterSpacing: '0.1em',
                        border: '1px solid',
                        borderColor: alpha(accentColor, 0.3),
                        px: { xs: 0.5, sm: 2 },
                        py: { xs: 0.5, sm: 1 },
                        '&:hover': {
                            borderColor: accentColor,
                            backgroundColor: alpha(accentColor, 0.05),
                            boxShadow: `0 0 10px ${alpha(accentColor, 0.2)}`
                        }
                    }}
                >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{"< RETURN_TO_BASE"}</Box>
                    <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>{"< BACK"}</Box>
                </Button>

                <Box sx={{ alignSelf: 'flex-start', mt: { xs: 0, md: 1 }, width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontFamily: 'monospace', 
                            color: accentColor,
                            fontSize: { xs: '1rem', sm: '1.43rem', md: '1.8rem' },
                            fontWeight: 'bold',
                            opacity: 0.6,
                            mr: 1
                        }}
                    >
                        C:\USERS\JAIGOBE\
                    </Typography>
                    
                    <InputBase
                        value={displayText}
                        onChange={handleInputChange}
                        autoFocus={false}
                        sx={{
                            fontFamily: 'monospace',
                            color: accentColor,
                            fontSize: { xs: '1rem', sm: '1.43rem', md: '1.8rem' },
                            fontWeight: 'bold',
                            width: 'auto',
                            minWidth: '200px',
                            textShadow: isDark ? `0 0 10px ${alpha(accentColor, 0.4)}` : 'none',
                            '& .MuiInputBase-input': {
                                padding: 0,
                                borderBottom: '2px solid transparent',
                                transition: 'all 0.2s ease',
                                '&:focus': {
                                    borderBottom: `2px solid ${alpha(accentColor, 0.5)}`,
                                    backgroundColor: alpha(accentColor, 0.05)
                                }
                            }
                        }}
                    />
                    
                    {showCursor && (
                        <Box sx={{ 
                            width: '8px', 
                            height: '1.1em', 
                            backgroundColor: accentColor, 
                            ml: 0.5 
                        }} />
                    )}
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
                {children}
            </Box>

            {/* Language Toggle Fixed */}
            <Box sx={{ position: 'fixed', bottom: { xs: 70, md: 100 }, right: 30, zIndex: 100 }}>
                <Button
                    onClick={() => setLanguage(l => l === 'ES' ? 'EN' : 'ES')}
                    sx={{
                        fontFamily: 'Datatype',
                        fontSize: '1rem', // Bigger font
                        color: accentColor,
                        border: '2px solid', // Thicker border
                        borderColor: alpha(accentColor, 0.6),
                        borderRadius: 0,
                        backgroundColor: alpha(accentColor, 0.08),
                        backdropFilter: 'blur(5px)',
                        px: 3, // More padding
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: accentColor,
                            color: isDark ? '#000' : '#fff',
                            boxShadow: `0 0 25px ${alpha(accentColor, 0.5)}`
                        }
                    }}
                >
                    [LNG: {language}]
                </Button>
            </Box>

            {/* Redesigned Footer System Status Bar */}
            <Box 
                sx={{ 
                    position: { xs: 'relative', md: 'fixed' }, 
                    bottom: 0, left: 0, right: 0, gap: 1,
                    p: 2, px: { xs: 2, md: 4 },
                    zIndex: 3,
                    display: 'flex', flexDirection: 'column',
                    backgroundColor: alpha(isDark ? theme.palette.background.paper : '#fff', 0.9),
                    borderTop: '1px solid',
                    borderColor: alpha(accentColor, 0.2),
                    backdropFilter: 'blur(10px)'
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
                        <Typography sx={{ 
                            fontFamily: 'Datatype', 
                            fontSize: '0.75rem', 
                            color: accentColor, 
                            fontWeight: 'bold' 
                        }}>
                            SYS_STATUS: OPERATIONAL [OK]
                        </Typography>
                        
                        {/* Linear Looping Glitched Progress */}
                        <Box sx={{ width: { xs: 100, sm: 180 }, position: 'relative' }}>
                            <LinearProgress 
                                variant="determinate" 
                                value={systemLoad} 
                                sx={{ 
                                    height: 5, 
                                    borderRadius: 0,
                                    backgroundColor: alpha(accentColor, 0.1),
                                    '& .MuiLinearProgress-bar': { 
                                        backgroundColor: accentColor, 
                                        animation: `${flickerAnim} 1.5s infinite ease-in-out`,
                                        // Disable transition when resetting to 0 to avoid "rewind" effect
                                        transition: systemLoad < 10 ? 'none' : 'transform 0.1s linear'
                                    }
                                }} 
                            />
                        </Box>

                        {/* Circular Progress Retro */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress 
                                variant="determinate" 
                                value={systemLoad} 
                                size={18} 
                                thickness={5}
                                sx={{ 
                                    color: accentColor,
                                    filter: isDark ? `drop-shadow(0 0 5px ${accentColor})` : 'none'
                                }}
                            />
                            <Typography sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: accentColor, fontWeight: 'bold' }}>
                                CPU_{Math.floor(systemLoad)}%
                            </Typography>
                        </Box>

                        <Typography sx={{ 
                            fontFamily: 'monospace', 
                            fontSize: '0.75rem', 
                            color: 'text.secondary', 
                            opacity: 0.8,
                            display: { xs: 'none', lg: 'block' } 
                        }}>
                            THREAD_ID: {Math.floor(systemLoad * 1234).toString(16).toUpperCase()}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
        </Box>
    );
};

export default DashboardLayout;
