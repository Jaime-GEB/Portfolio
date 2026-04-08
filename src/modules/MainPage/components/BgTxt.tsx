import { Box, Typography, keyframes } from "@mui/material";
import cvData from "../../../utils/cv.json";

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
    // Generate the JSON string once
    const cvString = JSON.stringify(cvData, null, 2);

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
            <Typography 
                variant='body2' 
                sx={{ 
                    fontSize: { xs: '2rem', md: '4rem' }, // Significantly larger
                    fontWeight: 900,
                    lineHeight: 1,
                    color: 'secondary.main',
                    opacity: 0.25, // Subtle yet visible
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all',
                    textAlign: 'left',
                    width: '120%', // Wider to cover movement
                    animation: `${moveUpDown} 20s ease-in-out infinite`, // Slow smooth animation
                    filter: 'blur(2px)', // Adds to the "glitch/HUD" depth
                }}
            >
                {/* Repeat enough times to fill space if necessary, but JSON is long enough here */}
                {cvString}
            </Typography>
        </Box>
    );
};

export default BgTxt;