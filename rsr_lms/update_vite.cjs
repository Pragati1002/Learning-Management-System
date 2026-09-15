const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. vite.config.js
save('vite.config.js', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
`);

// 2. src/index.css
save('src/index.css', `@import "tailwindcss";

body {
  background-color: #f8fafc;
  color: #1e293b;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.85; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.03); }
}

.ai-glow {
  animation: pulseGlow 2.5s infinite ease-in-out;
}
`);

// Remove postcss.config.js if exists to avoid conflicts
try {
  fs.unlinkSync(path.join(__dirname, 'postcss.config.js'));
  console.log('Removed postcss.config.js');
} catch(e) {}

console.log('Vite & Tailwind config updated.');
