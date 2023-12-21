import { create } from 'browser-sync';
import { rewriteRules } from './middleware.js';
import compression from 'compression';

const bsServer = create();
const previewDir = '/preview';

bsServer.init({
    files: ['./dist/**/*.*', './docs/**/*.*'],
    ghostMode: {
        clicks: false,
        forms: false,
        scroll: false,
    },
    open: false,
    notify: false,
    cors: true,
    reloadDebounce: 1000,
    reloadOnRestart: true,
    rewriteRules,
    server: {
        baseDir: '.',
        middleware: [
            compression(),
            // Redirect root to preview
            function (req, res, next) {
                if (req.url === '/') {
                    res.writeHead(301, { Location: previewDir });
                    res.end();
                }

                return next();
            },
        ],
        routes: {
            [previewDir]: './docs/',
            [`${previewDir}/CHANGELOG.md`]: './CHANGELOG.md',
        },
    },
    startPath: previewDir,
});
