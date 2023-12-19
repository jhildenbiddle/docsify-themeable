module.exports = {
    rewriteRules: [
        // Replace CDN URLs with local paths
        {
            match  : /https?.*\/CHANGELOG.md/g,
            replace: '/CHANGELOG.md'
        },
        {
            // CDN versioned default
            // Ex1: //cdn.com/package-name
            // Ex2: http://cdn.com/package-name@1.0.0
            // Ex3: https://cdn.com/package-name@latest
            match  : /(?:https?:)*\/\/.*cdn.*docsify-themeable[@\d.latest]*(?=["'])/g,
            replace: '/dist/js/docsify-themeable.min.js'
        },
        {
            // CDN paths to local paths
            // Ex1: //cdn.com/package-name/path/file.js => /path/file.js
            // Ex2: http://cdn.com/package-name@1.0.0/dist/file.js => /dist/file.js
            // Ex3: https://cdn.com/package-name@latest/dist/file.js => /dist/file.js
            match  : /(?:https?:)*\/\/.*cdn.*docsify-themeable[@\d.latest]*\/(?:dist\/)/g,
            replace: '/dist/'
        }
    ],
};
