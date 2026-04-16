import { Box, LinearProgress, CircularProgress, Typography, alpha, keyframes, useTheme } from '@mui/material';

const flickerAnim = keyframes`
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.3; }
    80% { opacity: 0.9; }
`;

interface RetroLinearProgressProps {
    value: number;
    accentColor: string;
}

export const RetroLinearProgress = ({ value, accentColor }: RetroLinearProgressProps) => {
    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <LinearProgress 
                variant="determinate" 
                value={value} 
                sx={{ 
                    height: 5, 
                    borderRadius: 0,
                    backgroundColor: alpha(accentColor, 0.1),
                    '& .MuiLinearProgress-bar': { 
                        backgroundColor: accentColor, 
                        animation: `${flickerAnim} 1.5s infinite ease-in-out`,
                        transition: value < 10 ? 'none' : 'transform 0.1s linear'
                    }
                }} 
            />
        </Box>
    );
};

interface RetroCircularProgressProps {
    value: number;
    accentColor: string;
    size?: number;
    thickness?: number;
}

export const RetroCircularProgress = ({ value, accentColor, size = 18, thickness = 5 }: RetroCircularProgressProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <CircularProgress 
            variant="determinate" 
            value={value} 
            size={size} 
            thickness={thickness}
            sx={{ 
                color: accentColor,
                filter: isDark ? `drop-shadow(0 0 5px ${accentColor})` : 'none'
            }}
        />
    );
};

interface SystemMetricItemProps {
    label: string;
    value: number;
    accentColor: string;
    showPercent?: boolean;
}

export const SystemMetricItem = ({ label, value, accentColor, showPercent = true }: SystemMetricItemProps) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ 
                fontFamily: 'Datatype', 
                fontSize: '0.75rem', 
                color: accentColor, 
                fontWeight: 'bold' 
            }}>
                {label}
            </Typography>
            <Box sx={{ width: { xs: 100, sm: 180 } }}>
                <RetroLinearProgress value={value} accentColor={accentColor} />
            </Box>
            {showPercent && (
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.7rem', color: accentColor, fontWeight: 'bold' }}>
                    {Math.floor(value)}%
                </Typography>
            )}
        </Box>
    );
};
