import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    ViteImageOptimizer({
      // WebP settings
      webp: {
        quality: 80,
        effort: 6
      },
      // AVIF settings (optional - even smaller files)
      avif: {
        quality: 75,
        effort: 4
      },
      // Only process these image types
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg'],
      // Skip already optimized files
      exclude: ['**/*.webp', '**/*.avif']
    })
  ],
  build: {
    // Ensure images are processed and not inlined
    assetsInlineLimit: 0
  }
})