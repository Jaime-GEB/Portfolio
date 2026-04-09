import { Suspense } from 'react';
import { CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AppRouter from './Router';
import { themeStore } from './store/ThemeStore/themeStore';
import { themes } from './store/ThemeStore/Themes/themes';
import { NotificationProvider } from './providers/NotificationProvider/NotificationProvider';
import { useSoundEffects } from './hooks/useSoundEffects';

function App() {
  const { mode } = themeStore();
  useSoundEffects(); // Initialize global click sound effect

  return (
    <ThemeProvider theme={themes[mode]}>
      <CssBaseline />
      <NotificationProvider>
        <Suspense
          fallback={
            <main className="h-screen w-screen flex justify-center items-center ">
              <CircularProgress />
            </main>
          }
        >
          <AppRouter />
        </Suspense>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App
