import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/600.css'
import '@fontsource/be-vietnam-pro/700.css'
import '@fontsource/be-vietnam-pro/800.css'
import '@fontsource/dancing-script/600.css'
import '@fontsource/dancing-script/700.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import './index.css'
import { MotionGlobalConfig } from 'motion/react'

// Chỉ dùng khi chụp ảnh kiểm thử: ?static=1 → bỏ qua hoạt ảnh
if (import.meta.env.VITE_SHOT && new URLSearchParams(window.location.search).has('static')) {
  MotionGlobalConfig.skipAnimations = true
}
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
