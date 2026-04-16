import { Box, Button, Typography, InputBase, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypingEffect } from '../../../hooks/useTypingEffect';

interface DashboardHeaderProps {
    accentColor: string;
    isDark: boolean;
    onInputChange: (val: string) => void;
}

const DashboardHeader = ({ accentColor, isDark, onInputChange }: DashboardHeaderProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const fullName = "Jaime Gómez-Estrada Berrouet";
    
    // Typing effect hook
    const { displayText, setDisplayText, showCursor } = useTypingEffect(fullName);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setDisplayText(val);
        onInputChange(val);
    };

    return (
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
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{t('dashboard.return_to_base')}</Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>{t('dashboard.back')}</Box>
            </Button>

            <Box sx={{ alignSelf: 'flex-start', mt: { xs: 0, md: 1 }, width: '100%', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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
                        flex: 1,
                        maxWidth: '450px',
                        minWidth: { xs: '150px', sm: '300px' },
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
    );
};

export default DashboardHeader;
