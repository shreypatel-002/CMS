import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({

  server:{
    host:"0.0.0.0",
    proxy:{
      '/api':{
        target:'http://localhost:3500',
        secure:false,
        changeOrigin: true,
      },
      
    },
  },
  
  build: {
    rollupOptions: {
      external: ['mongoose'],
    },
  },
  plugins: [react()],
});
