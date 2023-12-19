const browserSync = require('browser-sync').create();
const compression = require('compression');
const { rewriteRules } = require('./preview.config.cjs');

const previewDir = '/preview';

browserSync.init({
    files: [
        './dist/**/*.*',
        './docs/**/*.*'
    ],
    ghostMode: {
        clicks: false,
        forms : false,
        scroll: false
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
            function(req, res, next) {
                if (req.url === '/') {
                    res.writeHead(301, { Location: previewDir });
                    res.end();
                }

                return next();
            }
        ],
        routes: {
            [previewDir]: './docs/',
            [`${previewDir}/CHANGELOG.md`]: './CHANGELOG.md',
        }
    },
    startPath: previewDir,
});
