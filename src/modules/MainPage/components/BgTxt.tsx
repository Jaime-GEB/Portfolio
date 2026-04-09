import { Box, Typography, keyframes } from "@mui/material";
import { useState, useEffect, useMemo } from "react";

// Animation for moving the background text up and down
const moveUpDown = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const BgTxt = () => {
    const [cvString, setCvString] = useState('');
    
    // Load cv.json lazily and cache it - only execute once
    useEffect(() => {
        let cancelled = false;
        
        import("../../../utils/cv.json").then((module) => {
            if (!cancelled) {
                const cvData = module.default;
                setCvString(JSON.stringify(cvData, null, 2));
            }
        }).catch(() => {
            // Gracefully handle import error
            if (!cancelled) setCvString('');
        });
        
        return () => {
            cancelled = true;
        };
    }, []);
    
    // Memoize the rendered Typography to avoid re-rendering when parent updates
    const typography = useMemo(() => (
        <Typography 
            variant='body2' 
            sx={{ 
                fontSize: { xs: '2rem', md: '4rem' },
                fontWeight: 900,
                lineHeight: 1,
                color: 'secondary.main',
                opacity: 0.25,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                textAlign: 'left',
                width: '120%',
                animation: `${moveUpDown} 20s ease-in-out infinite`,
                filter: 'blur(2px)',
            }}
        >
            {cvString}
        </Typography>
    ), [cvString]);

    return (
        <Box sx={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            userSelect: 'none',
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 1,
            zIndex: -1,
            display: 'flex',
            justifyContent: 'center'
        }}>
            {typography}
        </Box>
    );
};

export default BgTxt;