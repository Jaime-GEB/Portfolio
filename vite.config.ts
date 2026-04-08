import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/newApi': {
        target: 'https://192.168.150.92:8003',
        changeOrigin: true, // Cambiar el origen del host de la solicitud
        secure: false, // Ignorar el error de certificado (autofirmado)
        rewrite: (path) => path.replace(/^\/newApi/, '/api')
      },
    },
  },
})
