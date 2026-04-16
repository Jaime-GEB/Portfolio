import { useState, type ReactNode } from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSoundEffects } from '../hooks/useSoundEffects';
import ThemeToggle from '../components/main/ThemeSwitch';
import DashboardHeader from './Dashboard/components/DashboardHeader';
import DashboardFooter from './Dashboard/components/DashboardFooter';
import LanguageToggle from './Dashboard/components/LanguageToggle';
import EasterEggOverlay from './Dashboard/components/EasterEggOverlay';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const accentColor = theme.palette.primary.main;
    
    // i18n
    const { i18n } = useTranslation();
    const { playYay } = useSoundEffects();

    // States
    const [language, setLanguage] = useState<'ES' | 'EN'>(i18n.language && i18n.language.toLowerCase().startsWith('en') ? 'EN' : 'ES');
    const [easterEgg, setEasterEgg] = useState<{ visible: boolean; image: string } | null>(null);

    const handleLanguageToggle = (next: 'ES' | 'EN') => {
        setLanguage(next);
        i18n.changeLanguage(next.toLowerCase());
    };

    const handleHeaderInputChange = (val: string) => {
        const cleanVal = val.trim().toLowerCase();
        if (cleanVal === 'mondarina') {
            playYay();
            setEasterEgg({
                visible: true,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuB38sD1_UfeYI_Yb10Vm5LH82dsfiCQr2UA&s"
            });
        } else if (cleanVal === 'inade') {
            playYay();
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
                pb: { xs: 12, md: 12 },
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

            <EasterEggOverlay 
                visible={!!easterEgg?.visible} 
                image={easterEgg?.image || ""} 
                accentColor={accentColor} 
                onClose={() => setEasterEgg(null)} 
            />

            <DashboardHeader 
                accentColor={accentColor} 
                isDark={isDark} 
                onInputChange={handleHeaderInputChange} 
            />

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
                {children}
            </Box>

            <LanguageToggle 
                accentColor={accentColor} 
                isDark={isDark} 
                language={language} 
                onToggle={handleLanguageToggle} 
            />

            <DashboardFooter accentColor={accentColor} isDark={isDark} />
        </Box>
    );
};

export default DashboardLayout;
