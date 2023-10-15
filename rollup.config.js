// Dependencies
// =============================================================================

import { babel }       from '@rollup/plugin-babel';
import commonjs        from '@rollup/plugin-commonjs';
import eslint          from '@rollup/plugin-eslint';
import fs              from 'node:fs/promises';
import json            from '@rollup/plugin-json';
import mergician       from 'mergician';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import path            from 'node:path';
import terser          from '@rollup/plugin-terser';

const pkg = JSON.parse(
    await fs.readFile(new URL('./package.json', import.meta.url), 'utf8') // prettier-ignore
);


// Settings
// =============================================================================
// Copyright
const currentYear = (new Date()).getFullYear();
const releaseYear = 2018;

// Output
const entryFile  = path.resolve('src', 'js', 'index.js');
const outputFile = path.resolve('dist', 'js', `${pkg.name}.js`);

// Banner
const bannerData = [
    `${pkg.name}`,
    `v${pkg.version}`,
    `${pkg.homepage}`,
    `(c) ${releaseYear}${currentYear === releaseYear ? '' : '-' + currentYear} ${pkg.author}`,
    `${pkg.license} license`
];

// Plugins
const pluginSettings = {
    eslint: {
        exclude       : ['node_modules/**', './package.json'],
        throwOnWarning: false,
        throwOnError  : true
    },
    babel: {
        babelHelpers: 'bundled',
        exclude: ['node_modules/**'],
        presets: [
            ['@babel/env', {
                modules: false,
                targets: {
                    browsers: ['ie >= 10']
                }
            }]
        ]
    },
    terser: {
        beautify: {
            compress: false,
            mangle  : false,
            output: {
                beautify: true,
                comments: /(?:^!|@(?:license|preserve))/
            }
        },
        minify: {
            compress: true,
            mangle  : true,
            output  : {
                comments: new RegExp(pkg.name)
            }
        }
    }
};


// Config
// =============================================================================
// Base
const config = {
    input : entryFile,
    output: {
        file     : outputFile,
        banner   : `/*!\n * ${ bannerData.join('\n * ') }\n */`,
        sourcemap: true
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        eslint(pluginSettings.eslint),
        babel(pluginSettings.babel)
    ],
    watch: {
        clearScreen: false
    }
};

// Formats
// -----------------------------------------------------------------------------
// IIFE
const iife = mergician({}, config, {
    output: {
        format: 'iife'
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.beautify)
    ])
});

// IIFE (Minified)
const iifeMinified = mergician({}, config, {
    output: {
        file  : iife.output.file.replace(/\.js$/, '.min.js'),
        format: iife.output.format
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.minify)
    ])
});


// Exports
// =============================================================================
export default [
    iife,
    iifeMinified
];
