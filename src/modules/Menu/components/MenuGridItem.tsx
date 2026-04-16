import { useState } from 'react';
import { Box, Typography, Paper, Link, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGlitchText } from '../../../hooks/useGlitchText';

interface MenuItem {
    id: number;
    label: string;
    link: string;
    isExternal: boolean;
    isDownload?: boolean;
    desc?: string;
}

const GRID_AREAS_DESKTOP = [
    { gridArea: '1 / 1 / 3 / 3' },
    { gridArea: '1 / 3 / 2 / 5' },
    { gridArea: '2 / 3 / 4 / 4' },
    { gridArea: '3 / 1 / 4 / 3' },
    { gridArea: '2 / 4 / 4 / 5' },
];

const GRID_AREAS_MOBILE = [
    { gridArea: 'auto' },
    { gridArea: 'auto' },
    { gridArea: 'auto' },
    { gridArea: 'auto' },
    { gridArea: 'auto' },
];

const MenuGridItem = ({ item, index, isDark, theme, isMobile }: { item: MenuItem, index: number, isDark: boolean, theme: any, isMobile: boolean }) => {
    const { 
        renderGlitchedText, 
        handleMouseEnter, 
        handleMouseLeave 
    } = useGlitchText(item.label);

    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setClicked(true);
        setTimeout(() => setClicked(false), 400);

        setTimeout(() => {
            if (item.isDownload) {
                const linkObj = document.createElement('a');
                linkObj.href = item.link;
                linkObj.download = "Jaime_Gomez_CV.pdf";
                document.body.appendChild(linkObj);
                linkObj.click();
                linkObj.remove();
            } else if (item.label === 'CONTACT') {
                globalThis.location.href = item.link;
            } else if (item.isExternal) {
                globalThis.open(item.link, '_blank');
            } else {
                navigate(item.link.trim());
            }
        }, 500);
    };

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
    const accentColor = theme.palette.primary.main;
    const defaultBorderColor = isDark ? theme.palette.divider : alpha(theme.palette.common.black, 0.1);
    const borderColor = clicked ? accentColor : defaultBorderColor;

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
                display: 'flex',
                position: 'relative'
            }}
        >
            {clicked && (
                <Box
                    component={motion.div}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        borderRadius: '8px',
                        border: `2px solid ${accentColor}`,
                        backgroundColor: alpha(accentColor, 0.15),
                        boxShadow: `0 0 30px ${alpha(accentColor, 0.5)}, inset 0 0 20px ${alpha(accentColor, 0.2)}`,
                        pointerEvents: 'none'
                    }}
                />
            )}

            <Paper
                elevation={0}
                component={Link}
                href={item.link}
                underline="none"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: isDark ? alpha(theme.palette.background.paper, 0.4) : theme.palette.primary.main,
                    border: '1px solid',
                    borderColor: borderColor,
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

export default MenuGridItem;
