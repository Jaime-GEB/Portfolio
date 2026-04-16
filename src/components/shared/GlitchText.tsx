import { Typography, type TypographyProps } from '@mui/material';
import { useGlitchText } from '../../hooks/useGlitchText';

interface GlitchTextProps extends TypographyProps {
    text: string;
}

/**
 * Reusable component that applies a glitch effect on hover.
 */
export const GlitchText = ({ text, sx, ...props }: GlitchTextProps) => {
    const { 
        renderGlitchedText, 
        handleMouseEnter, 
        handleMouseLeave 
    } = useGlitchText(text);

    return (
        <Typography 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ 
                cursor: 'default',
                transition: 'color 0.3s ease',
                ...sx
            }}
            {...props}
        >
            {renderGlitchedText()}
        </Typography>
    );
};
