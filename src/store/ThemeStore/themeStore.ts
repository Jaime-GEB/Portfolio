import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from './Themes/themes';

// Interfaz para el estado del tema
interface ThemeState {
    mode: ThemeMode;
    toggleTheme: () => void;
    setMode: (mode: ThemeMode) => void;
}

// Store de Zustand para gestionar el tema de la aplicación
export const themeStore = create<ThemeState>()(
    persist(
        (set) => ({
            mode: 'dark', // Modo por defecto
            toggleTheme: () => {
                set((state) => ({
                    mode: state.mode === 'light' ? 'dark' : 'light',
                }));
            },
            setMode: (mode) => set({ mode }),
        }),
        {
            name: 'theme-storage', // Nombre del almacenamiento en localStorage
        },
    ),
);
