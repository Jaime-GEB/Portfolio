import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Link, useTheme, alpha, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import cvPdf from '../../../../src/utils/Jaime Gómez-Estrada _ Full Stack Developer.pdf';
import { useGlitchText } from '../../../hooks/useGlitchText';

// Definición de los elementos del menú
const INITIAL_ITEMS = [
    { id: 1, label: "GITHUB", link: "https://github.com/Jaime-GEB", desc: "View my source code and technical projects" },
    { id: 2, label: "LINKEDIN", link: "https://www.linkedin.com/in/jaime-gómez-estrada-berrouet-2a4894198", desc: "Connect with me professionally" },
    { id: 3, label: "DOWNLOAD_CV", link: cvPdf, desc: "Get my full professional background" },
    { id: 4, label: "PROJECTS", link: "#", desc: "Explore my interactive portfolio" },
    { id: 5, label: "CONTACT", link: "mailto:jgestrada02@gmail.com", desc: "Let's collaborate on your next project" },
];

// Áreas desiguales del grid (ampliadas)
const GRID_AREAS_DESKTOP = [
    { gridArea: '1 / 1 / 3 / 3' }, // Grande 2x2
    { gridArea: '1 / 3 / 2 / 5' }, // Horizontal 2x1
    { gridArea: '2 / 3 / 4 / 4' }, // Vertical 1x2
    { gridArea: '3 / 1 / 4 / 3' }, // Horizontal 2x1
    { gridArea: '2 / 4 / 4 / 5' }, // Vertical 1x2
];

const GRID_AREAS_MOBILE = [
    { gridArea: 'auto' },
    { gridArea: 'auto' },
    { gridArea: 'auto' },
    { gridArea: 'auto' },
    { gridArea: 'auto' },
];

interface MenuItem {
    id: number;
    label: string;
    link: string;
    desc: string;
}

const MenuGridItem = ({ item, index, isDark, theme, isMobile }: { item: MenuItem, index: number, isDark: boolean, theme: any, isMobile: boolean }) => {
    const { 
        renderGlitchedText, 
        handleMouseEnter, 
        handleMouseLeave 
    } = useGlitchText(item.label);

    let labelFontSize = '1.8rem';
    if (isMobile) {
        labelFontSize = '1.4rem';
    } else if (index === 0) {
        labelFontSize = '3rem';
    }

    let labelMinHeight = '2.2rem';
    if (isMobile) {
        labelMinHeight = 'auto';
    } else if (index === 0) {
        labelMinHeight = '3.5rem';
    }

    const labelMarginBottom = isMobile ? 1 : 2;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
                layout: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.5 }
            }}
            style={{ 
                ...(isMobile ? GRID_AREAS_MOBILE[index] : GRID_AREAS_DESKTOP[index]), 
                display: 'flex' 
            }}
        >
            <Paper
                elevation={0}
                component={Link}
                href={item.link}
                underline="none"
                download={item.label === "DOWNLOAD CV" ? "Jaime_Gomez_CV.pdf" : undefined}
                target={item.label.includes('CV') || item.label.includes('GITHUB') || item.label.includes('LINKEDIN') ? "_blank" : "_self"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.4) : theme.palette.primary.main,
                    border: '1px solid',
                    borderColor: isDark ? theme.palette.divider : alpha(theme.palette.common.black, 0.1),
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 2.5, sm: 3, md: 4 },
                    minHeight: { xs: '120px', md: '100%' },
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isDark ? 'none' : `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
                    '&:hover': {
                        borderColor: theme.palette.primary.main,
                        backgroundColor: isDark ? alpha(theme.palette.primary.main, 0.05) : alpha(theme.palette.primary.main, 0.02),
                        boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, isDark ? 0.15 : 0.1)}`,
                        transform: 'translateY(-5px)',
                        '& .item-desc': { opacity: 1, transform: 'translateY(0)' },
                        '& .item-label': { color: theme.palette.primary.main, letterSpacing: '0.1em' }
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        width: 15,
                        height: 15,
                        borderTop: '2px solid',
                        borderRight: '2px solid',
                        borderColor: theme.palette.primary.main,
                        opacity: isDark ? 0.3 : 0.5
                    }
                }}
            >
                <Typography
                    className="item-label"
                    variant="h2"
                    sx={{
                        fontSize: labelFontSize,
                        textAlign: 'center',
                        transition: 'all 0.4s ease',
                        color: 'text.primary',
                        mb: labelMarginBottom,
                        fontWeight: 'bold',
                        minHeight: labelMinHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {renderGlitchedText()}
                </Typography>
                
                <Typography
                    className="item-desc"
                    variant="body2"
                    sx={{
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        color: 'text.secondary',
                        opacity: 0,
                        transform: 'translateY(15px)',
                        transition: 'all 0.4s ease',
                        fontFamily: 'Doto',
                        maxWidth: '80%'
                    }}
                >
                    {item.desc}
                </Typography>

                <Box 
                    sx={{ 
                        position: 'absolute', 
                        bottom: 15, 
                        left: 15, 
                        opacity: 0.4, 
                        fontSize: '0.75rem', 
                        fontFamily: 'monospace',
                        color: 'primary.main',
                        fontWeight: 'bold'
                    }}
                >
                    NODE_0{item.id}_SYS
                </Box>
            </Paper>
        </motion.div>
    );
};

const MenuGrid = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isDark = theme.palette.mode === 'dark';
    const [items, setItems] = useState(INITIAL_ITEMS);

    // Rotación física cada 30 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const next = [...prev];
                const first = next.shift();
                if (first) {
                    next.push(first);
                }
                return next;
            });
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box 
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gridTemplateRows: { xs: 'auto', md: 'repeat(3, 220px)' },
                gap: { xs: 2, md: 3 },
                width: '100%',
                maxWidth: '1200px',
                padding: { xs: 0, sm: 2, md: 4 }
            }}
        >
            <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                    <MenuGridItem 
                        key={item.id} 
                        item={item} 
                        index={index} 
                        isDark={isDark} 
                        theme={theme} 
                        isMobile={isMobile}
                    />
                ))}
            </AnimatePresence>
        </Box>
    );
};

export default MenuGrid;
