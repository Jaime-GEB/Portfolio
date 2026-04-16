import { useState, useEffect, useMemo } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import cvPdfEs from '../../../../src/utils/Jaime Gómez-Estrada _ Full Stack Developer.pdf';
import cvPdfEn from '../../../../src/utils/Jaime Gómez-Estrada _ Full Stack Developer_En.pdf';
import MenuGridItem from './MenuGridItem';

// Definición de los elementos del menú
const BASE_ITEMS = [
    { id: 1, label: "GITHUB", link: "https://github.com/Jaime-GEB", isExternal: true },
    { id: 2, label: "LINKEDIN", link: "https://www.linkedin.com/in/jaime-gómez-estrada-berrouet-2a4894198", isExternal: true },
    { id: 3, label: "DOWNLOAD_CV", link: "", isExternal: true, isDownload: true },
    { id: 4, label: "PROJECTS", link: "/proyectos", isExternal: false },
    { id: 5, label: "CONTACT", link: "mailto:jgestrada02@gmail.com", isExternal: false },
];

const MenuGrid = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isDark = theme.palette.mode === 'dark';
    const { t, i18n } = useTranslation();

    const cvPdf = i18n.language === 'en' ? cvPdfEn : cvPdfEs;

    const baseItems = useMemo(() => BASE_ITEMS.map(item => ({
        ...item,
        link: item.isDownload ? cvPdf : item.link,
        desc: t(`menu.desc_${item.id}`)
    })), [cvPdf, t]);

    const [rotation, setRotation] = useState(0);

    const items = useMemo(() => {
        const rotated = [...baseItems];
        for (let i = 0; i < rotation; i++) {
            const first = rotated.shift();
            if (first) rotated.push(first);
        }
        return rotated;
    }, [baseItems, rotation]);

    // Rotación física cada 30 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(r => r + 1);
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
