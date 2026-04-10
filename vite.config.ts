import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // Allow Create-React-App-style env vars (e.g. REACT_APP_GOOGLE_API_KEY) in addition to VITE_*.
  envPrefix: ['VITE_', 'REACT_APP_'],
});
