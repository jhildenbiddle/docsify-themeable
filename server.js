import * as path from 'node:path';
import * as url from 'node:url';
import { create } from 'browser-sync';
import { rewriteRules } from './middleware.js';
import compression from 'compression';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bsServer = create();

bsServer.init({
  files: ['./dist/**/*.*', './docs/**/*.*'],
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
  },
  open: false,
  notify: false,
  cors: true,
  reloadDebounce: 1000,
  reloadOnRestart: true,
  rewriteRules,
  server: {
    baseDir: './docs',
    middleware: [compression()],
    routes: {
      '/changelog.md': path.resolve(__dirname, 'CHANGELOG.md'),
      '/dist': path.resolve(__dirname, 'dist')
    }
  }
});
