// Dependencies
// =============================================================================
import cssVars                    from 'css-vars-ponyfill';
import pluginFixCoverHeader       from './plugin-fix-cover-header';
import pluginFixNavbarMenus       from './plugin-fix-navbar-menus';
import pluginFixPrismThemes       from './plugin-fix-prism-themes';
import pluginFixReadyState        from './plugin-fix-ready-state';
import pluginFixSearchClearButton from './plugin-fix-search-clear-button';
import pluginFixSearchResults     from './plugin-fix-search-results';
import pluginFixZoomImage         from './plugin-fix-zoomimage';
import pluginReadyTransition      from './plugin-ready-transition';
import pluginResponsiveTables     from './plugin-responsive-tables';
import { version as pkgVersion }  from '../../package.json';


// Main
// =============================================================================
// Docsify plugins
if (window) {
    const cssVarsOptions = {
        // Force ponyfill on Edge 15/16 due to numerous custom property bugs
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/?page=1&q=%22custom%20property%22%20%22custom%20properties%22%20%22css%20variable%22%20%22css%20variables%22
        onlyLegacy: !(/Edge\/15|Edge\/16./i.test(navigator.userAgent)),
        silent    : true
    };

    // CSS custom properties ponyfill
    cssVars(cssVarsOptions);

    window.$docsify = window.$docsify || {};

    // Add plugins
    window.$docsify.plugins = [].concat(
        // Prepend
        [
            pluginReadyTransition,
            pluginFixCoverHeader,
            pluginFixNavbarMenus,
            pluginFixPrismThemes,
            pluginFixReadyState,
            pluginResponsiveTables
        ],
        // Existing
        (window.$docsify.plugins || []),
        // Append
        [
            pluginFixSearchClearButton,
            pluginFixSearchResults,
            pluginFixZoomImage
        ]
    );

    // Add themeable object
    window.$docsify.themeable = window.$docsify.themeable || {};

    // Add themeable properties
    window.$docsify.themeable.version = pkgVersion;

    // Add themeable utilities
    window.$docsify.themeable.util = {
        cssVars: function(options = cssVarsOptions) {
            cssVars(options);
        }
    };
}
