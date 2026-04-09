import { Suspense, useEffect, useState } from 'react';
import { CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AppRouter from './Router';
import { themeStore } from './store/ThemeStore/themeStore';
import { themes } from './store/ThemeStore/Themes/themes';
import { useSoundEffects } from './hooks/useSoundEffects';

function App() {
  const { mode } = themeStore();
  const [i18nReady, setI18nReady] = useState(false);
  
  // Load i18n lazily after initial render (don't block LCP)
  useEffect(() => {
    import('./i18n/config').then(() => {
      setI18nReady(true);
    });
  }, []);
  
  useSoundEffects(); // Initialize global click sound effect
  
  // Show loading spinner until i18n is initialized
  if (!i18nReady) {
    return (
      <ThemeProvider theme={themes[mode]}>
        <CssBaseline />
        <main className="h-screen w-screen flex justify-center items-center">
          <CircularProgress />
        </main>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={themes[mode]}>
      <CssBaseline />
        <Suspense
          fallback={
            <main className="h-screen w-screen flex justify-center items-center ">
              <CircularProgress />
            </main>
          }
        >
          <AppRouter />
        </Suspense>
    </ThemeProvider>
  )
}

export default App
