import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import {createHtmlPlugin} from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, './', 'VITE_') as any;

  const options = {
    plugins: [
        vue({
            reactivityTransform: true
        }),
        createHtmlPlugin({
          minify: true,
          entry: '/src/main.ts',
          template: 'index.html'
        })
    ]
  };

  if (command == 'serve') {
      options['server'] = {
          host: '0.0.0.0',
          proxy: {
              '^/api/': {
                  target: env.VITE_API_HOST,
                  ws: true,
                  changeOrigin: true,
                  rewrite: (path) => path.replace('/api/', '/')
              }
          }
      }
  }

  return options;
})
