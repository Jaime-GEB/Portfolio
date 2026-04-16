import { Box, Typography, alpha, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSystemMetrics } from '../../../hooks/useSystemMetrics';
import { SystemMetricItem, RetroCircularProgress } from '../../../components/shared/RetroProgress';

interface DashboardFooterProps {
    accentColor: string;
    isDark: boolean;
}

const DashboardFooter = ({ accentColor, isDark }: DashboardFooterProps) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const systemLoad = useSystemMetrics();

    return (
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
                    <SystemMetricItem 
                        label={t('dashboard.sys_status')} 
                        value={systemLoad} 
                        accentColor={accentColor} 
                        showPercent={false} 
                    />
                    
                    {/* Retro Circular Progress specifically for CPU */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RetroCircularProgress value={systemLoad} accentColor={accentColor} />
                        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: accentColor, fontWeight: 'bold' }}>
                            {t('dashboard.cpu', { percent: Math.floor(systemLoad) })}
                        </Typography>
                    </Box>

                    <Typography sx={{ 
                        fontFamily: 'monospace', 
                        fontSize: '0.75rem', 
                        color: 'text.secondary', 
                        opacity: 0.8,
                        display: { xs: 'none', lg: 'block' } 
                    }}>
                        {t('dashboard.thread_id', { id: Math.floor(systemLoad * 1234).toString(16).toUpperCase() })}
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
    );
};

export default DashboardFooter;
