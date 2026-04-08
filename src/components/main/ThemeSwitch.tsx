import { Box, Typography, keyframes } from "@mui/material";
import { themeStore } from "../../store/ThemeStore/themeStore";
import { useEffect } from "react";

// Glitch/flicker animation for HUD effect
const flicker = keyframes`
  0% { opacity: 0.8; }
  5% { opacity: 1; }
  10% { opacity: 0.9; }
  15% { opacity: 1; }
  20% { opacity: 0.7; }
  25% { opacity: 1; }
  100% { opacity: 1; }
`;

const ThemeToggle = () => {
    const { mode, toggleTheme } = themeStore();

    useEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    const isDark = mode === "dark";

    return (
        <Box
            onClick={toggleTheme}
            sx={{
                position: "absolute",
                top: 20,
                right: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "8px 16px",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "6px",
                backgroundColor: isDark ? "rgba(0, 255, 210, 0.05)" : "rgba(0, 179, 164, 0.05)",
                boxShadow: `0 0 10px ${isDark ? "rgba(0, 255, 210, 0.1)" : "rgba(0, 179, 164, 0.1)"}`,
                transition: "all 0.2s ease-in-out",
                zIndex: 1000,
                animation: `${flicker} 4s infinite`,
                "&:hover": {
                    backgroundColor: "primary.main",
                    "& .MuiTypography-root": {
                        backgroundColor: "background.default",
                        color: "primary.main",
                        fontFamily: "Libre Barcode",
                        transition: "all 0.2s ease-in-out",
                        padding: "1px 3px",
                    },
                    "& .indicator-dot": {
                        color: "background.default",
                    },
                },
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -5,
                    left: 20,
                    width: 30,
                    height: 2,
                    backgroundColor: "primary.main",
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -5,
                    right: 20,
                    width: 30,
                    height: 2,
                    backgroundColor: "primary.main",
                },
            }}
        >
            {/* Status indicator */}
            <Box
                className="indicator-dot"
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    boxShadow: "0 0 8px currentColor",
                }}
            />

            <Typography
                variant="h3" // Doto font from theme
                sx={{
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    userSelect: "none",
                }}
            >
                SYS_MODE: <span style={{ fontWeight: 900 }}>[{mode.toUpperCase()}]</span>
            </Typography>

            <Box sx={{ 
                fontSize: '10px', 
                color: 'primary.main', 
                opacity: 0.6, 
                ml: 1,
                fontFamily: 'monospace' 
            }}>
                ID_0x7A
            </Box>
        </Box>
    );
};

export default ThemeToggle;
