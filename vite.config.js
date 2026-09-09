import fs from 'node:fs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

/**
 * Plugin that automatically injects the version from package.json into sw.js
 * both during local development and in the production build output.
 */
function swVersionPlugin() {
  return {
    name: 'sw-version-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sw.js') {
          const content = fs.readFileSync('public/sw.js', 'utf-8');
          res.setHeader('Content-Type', 'application/javascript');
          res.end(content.replaceAll('__APP_VERSION__', pkg.version));
          return;
        }
        next();
      });
    },
    closeBundle() {
      const swDistPath = 'dist/sw.js';
      if (fs.existsSync(swDistPath)) {
        const content = fs.readFileSync(swDistPath, 'utf-8');
        fs.writeFileSync(swDistPath, content.replaceAll('__APP_VERSION__', pkg.version));
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), swVersionPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  server: {
    host: true,
    port: 5173
  }
});
