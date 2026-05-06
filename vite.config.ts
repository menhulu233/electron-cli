import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron/simple';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const alias = {
  '@': path.resolve(__dirname, './src/renderer'),
  '@shared': path.resolve(__dirname, './src/shared'),
};

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    plugins: [
      vue(),
      electron({
        main: {
          entry: 'src/main/index.ts',
          vite: {
            resolve: { alias },
            define: {
              __dirname: JSON.stringify(__dirname),
              __filename: JSON.stringify(__filename),
            },
            build: {
              sourcemap,
              minify: !isServe,
              outDir: 'dist-electron/main',
              rollupOptions: {
                external: ['better-sqlite3'],
              },
            },
          },
        },
        preload: {
          input: 'src/main/preload.ts',
          vite: {
            resolve: { alias },
            build: {
              sourcemap: sourcemap ? 'inline' : undefined,
              minify: !isServe,
              outDir: 'dist-electron/preload',
            },
          },
        },
        renderer: {
          resolve: { alias },
        },
      }),
    ],
    server: {
      port: 5173,
      strictPort: true,
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});
