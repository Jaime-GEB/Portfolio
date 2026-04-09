import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        bjCree: React.CSSProperties;
        barcode: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        bjCree?: React.CSSProperties;
        barcode?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        bjCree: true;
        barcode: true;
    }
}

const baseTypography = {
    fontFamily: `"Datatype", "IBM Plex Mono", "JetBrains Mono", monospace`,
    h1: { 
        fontFamily: `"Sixtyfour", cursive`,
        fontWeight: 400,
        fontSize: '3rem',
    },
    h2: { 
        fontFamily: `"Bebas Neue", sans-serif`,
        fontWeight: 400,
        fontSize: '2.5rem',
        letterSpacing: '0.05em',
    },
    h3: { 
        fontFamily: `"Doto", sans-serif`,
        fontWeight: 600,
        fontSize: '1.75rem',
    },
    body1: {
        fontFamily: `"Datatype", monospace`,
    },
    body2: {
        fontFamily: `"Doto", sans-serif`,
        fontWeight: 400,
        fontSize: '1.2rem',
    },
    button: {
        textTransform: "none" as const,
        fontWeight: 500,
        fontFamily: `"Datatype", monospace`,
    },
    // Custom variants
    bjCree: {
        fontFamily: `"BJ Cree", sans-serif`,
    },
    barcode: {
        fontFamily: `"Libre Barcode", cursive`,
        fontSize: '3rem',
    },
};

/* =========================
    DARK THEME
   ========================= */
export const darkTheme = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#050A0A",
            paper: "#0D1B1C",
        },

        text: {
            primary: "#E3F2EF",
            secondary: "#9AB8B2",
        },

        primary: {
            main: "#00FFD2", // Cian fosforito HUD
            contrastText: "#050A0A",
        },

        secondary: {
            main: "#7DFF00", // Verde terminal
            contrastText: "#050A0A",
        },

        warning: {
            main: "#FF8C32",
        },

        error: {
            main: "#FF3B3B",
        },

        divider: "#123638",
    },

    typography: baseTypography,

    shape: {
        borderRadius: 6,
    },

    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderWidth: 1,
                },
            },
        },
    },
});


/* =========================
    LIGHT THEME
   ========================= */
export const lightTheme = createTheme({
    palette: {
        mode: "light",

        background: {
            default: "#f4f4f4",
            paper: "#E6E8E3",
        },

        text: {
            primary: "#0E1A17",
            secondary: "#525252",
        },

        primary: {
            main: "#7DFF00", // Verde terminal (anteriormente secundario)
            contrastText: "#0E1A17",
        },

        secondary: {
            main: "#00B3A4", // Cian (anteriormente primario)
            contrastText: "#0E1A17",
        },

        warning: {
            main: "#FF7A18",
        },

        error: {
            main: "#C5221F",
        },

        divider: "#BCC5BF",
    },

    typography: baseTypography,

    shape: {
        borderRadius: 6,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderWidth: 1,
                },
            },
        },
    },
});

export const themes = {
    light: lightTheme,
    dark: darkTheme,
};

export type ThemeMode = keyof typeof themes;
