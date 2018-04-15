// Dependencies
// =============================================================================
import cssVars                    from 'css-vars-ponyfill';
import pluginFixCoverHeader       from './plugin-fix-cover-header';
import pluginFixNavbarMenus       from './plugin-fix-navbar-menus';
import pluginFixPrismThemes       from './plugin-fix-prism-themes';
import pluginFixReadyState        from './plugin-fix-ready-state';
import pluginFixSearchClearButton from './plugin-fix-search-clear-button';
import pluginFixSearchResults     from './plugin-fix-search-results';
import pluginReadyTransition      from './plugin-ready-transition';
import pluginResponsiveTables     from './plugin-responsive-tables';
import { version as pkgVersion }  from '../../package.json';


// Main
// =============================================================================
// CSS custom properties ponyfill
cssVars({
    silent: true
});

// Docsify plugins
if (window) {
    window.$docsify = window.$docsify || {};
    window.$docsify.themeable = window.$docsify.themeable || {};

    // Add plugins
    window.$docsify.plugins = [
        pluginReadyTransition,
        pluginFixCoverHeader,
        pluginFixNavbarMenus,
        pluginFixPrismThemes,
        pluginFixReadyState,
        pluginFixSearchClearButton,
        pluginFixSearchResults,
        pluginResponsiveTables
    ].concat(window.$docsify.plugins || []);

    // Add themeable properties
    window.$docsify.themeable.version = pkgVersion;
}
