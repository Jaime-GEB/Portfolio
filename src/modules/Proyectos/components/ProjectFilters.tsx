import { Box, Typography, alpha, useTheme, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ProjectFiltersProps {
    languages: string[];
    frameworks: string[];
    selectedLanguage: string;
    selectedFramework: string;
    onLanguageChange: (lang: string) => void;
    onFrameworkChange: (fw: string) => void;
    accentColor: string;
}

const ProjectFilters = ({ 
    languages, 
    frameworks, 
    selectedLanguage, 
    selectedFramework, 
    onLanguageChange, 
    onFrameworkChange,
    accentColor 
}: ProjectFiltersProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const selectStyle = {
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        color: accentColor,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(accentColor, 0.3),
            borderRadius: 0,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: accentColor,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: accentColor,
        },
        '& .MuiSvgIcon-root': {
            color: accentColor,
        }
    };

    const labelStyle = {
        fontFamily: 'monospace',
        fontSize: '0.7rem',
        color: alpha(accentColor, 0.7),
        '&.Mui-focused': {
            color: accentColor,
        }
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 2, 
            mb: 4,
            p: 2,
            border: '1px dashed',
            borderColor: alpha(accentColor, 0.2),
            backgroundColor: alpha(accentColor, 0.02),
            position: 'relative'
        }}>
            <Box sx={{ 
                position: 'absolute', 
                top: -10, 
                left: 10, 
                px: 1, 
                backgroundColor: isDark ? '#0a0a0b' : '#fff', // Guessing background color or using theme
                color: accentColor,
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                fontWeight: 'bold',
                letterSpacing: '0.1em'
            }}>
                FILTER_SYSTEM_V.1.0
            </Box>

            <FormControl fullWidth size="small">
                <InputLabel sx={labelStyle}>{t('projects_page.filter_language') || 'LANGUAGE'}</InputLabel>
                <Select
                    value={selectedLanguage}
                    label={t('projects_page.filter_language') || 'LANGUAGE'}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    sx={selectStyle}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                borderRadius: 0,
                                backgroundColor: isDark ? '#1a1a1c' : '#fff',
                                border: `1px solid ${accentColor}`,
                                '& .MuiMenuItem-root': {
                                    fontFamily: 'monospace',
                                    fontSize: '0.8rem',
                                    color: isDark ? '#ccc' : '#333',
                                    '&.Mui-selected': {
                                        backgroundColor: alpha(accentColor, 0.2),
                                        color: accentColor,
                                    },
                                    '&:hover': {
                                        backgroundColor: alpha(accentColor, 0.1),
                                    }
                                }
                            }
                        }
                    }}
                >
                    <MenuItem value="ALL">{t('projects_page.all') || 'ALL'}</MenuItem>
                    {languages.map(lang => (
                        <MenuItem key={lang} value={lang}>{lang.toUpperCase()}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth size="small">
                <InputLabel sx={labelStyle}>{t('projects_page.filter_framework') || 'TECH_STACK'}</InputLabel>
                <Select
                    value={selectedFramework}
                    label={t('projects_page.filter_framework') || 'TECH_STACK'}
                    onChange={(e) => onFrameworkChange(e.target.value)}
                    sx={selectStyle}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                borderRadius: 0,
                                backgroundColor: isDark ? '#1a1a1c' : '#fff',
                                border: `1px solid ${accentColor}`,
                                '& .MuiMenuItem-root': {
                                    fontFamily: 'monospace',
                                    fontSize: '0.8rem',
                                    color: isDark ? '#ccc' : '#333',
                                    '&.Mui-selected': {
                                        backgroundColor: alpha(accentColor, 0.2),
                                        color: accentColor,
                                    },
                                    '&:hover': {
                                        backgroundColor: alpha(accentColor, 0.1),
                                    }
                                }
                            }
                        }
                    }}
                >
                    <MenuItem value="ALL">{t('projects_page.all') || 'ALL'}</MenuItem>
                    {frameworks.map(fw => (
                        <MenuItem key={fw} value={fw}>{fw.toUpperCase()}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default ProjectFilters;
