// Dependencies
// =============================================================================
const browserSync = require('browser-sync').create();
const compression = require('compression');

browserSync.init({
    files: [
        'dist/**/*.*',
        'docs/**/*.*'
    ],
    ghostMode: {
        clicks: false,
        forms : false,
        scroll: false
    },
    open: false,
    notify: false,
    cors: true,
    reloadOnRestart: true,
    server: {
        baseDir: [
            './docs'
        ],
        middleware: [
            compression()
        ],
        routes: {
            '/css': './dist/css',
            '/js' : './dist/js'
        }
    },
    rewriteRules: [
        {
            // Replace CDN references with local paths
            match  : /https:\/\/unpkg\.com\/docsify-themeable\/dist\//g,
            replace: '/'
        }
    ]
});
