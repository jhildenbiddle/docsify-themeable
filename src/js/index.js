// Dependencies
// =============================================================================
import cssVars from 'css-vars-ponyfill';
import pluginFixCoverHeader from './plugin-fix-cover-header';
import pluginFixNavbarMenus from './plugin-fix-navbar-menus';
import pluginFixPrismThemes from './plugin-fix-prism-themes';
import pluginFixReadyState from './plugin-fix-ready-state';
import pluginFixSearchClearButton from './plugin-fix-search-clear-button';
import pluginFixSearchResults from './plugin-fix-search-results';
import pluginFixZoomImage from './plugin-fix-zoomimage';
import pluginReadyTransition from './plugin-ready-transition';
import pluginResponsiveTables from './plugin-responsive-tables';
import { version as pkgVersion } from '../../package.json';

// Functions
// =============================================================================
function isLessThanSemVer(version) {
  const docsifyVersion = ((window.Docsify || {}).version || '0.0.0').split('.');
  const lessThanVersion = version.split('.');

  while (lessThanVersion.length < docsifyVersion.length) {
    lessThanVersion.push('0');
  }

  return lessThanVersion.some((value, index) => value < docsifyVersion[index]);
}

// Main
// =============================================================================
// Docsify plugins
if (window) {
  const cssVarsOptions = {
    // Force ponyfill on Edge 15-18 due to many custom property bugs
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/?page=1&q=%22custom%20property%22%20%22custom%20properties%22%20%22css%20variable%22%20%22css%20variables%22
    onlyLegacy: !/Edge\/1[5678]/i.test(navigator.userAgent),
    silent: true
  };

  // CSS custom properties ponyfill
  cssVars(cssVarsOptions);

  // Add 'themeable' class to document for style hook
  document.documentElement.classList.add('themeable');

  // Add platform data to <body>
  document.body.setAttribute('data-platform', navigator.platform);

  // Create docsify config object if it does not already exist
  window.$docsify = window.$docsify || {};

  // Add plugins
  window.$docsify.plugins = []
    .concat(
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
      window.$docsify.plugins || [],
      // Append
      [
        pluginFixSearchClearButton,
        isLessThanSemVer('4.8.0', pluginFixSearchResults),
        isLessThanSemVer('4.8.0', pluginFixZoomImage)
      ]
    )
    .filter(plugin => plugin !== null);

  // Add search options
  if (typeof window.$docsify.search !== 'object') {
    window.$docsify.search = {};
  } else if (Array.isArray(window.$docsify.search)) {
    window.$docsify.search = {
      paths: window.$docsify.search
    };
  }

  window.$docsify.search.hideOtherSidebarContent = true;

  // Add themeable options
  window.$docsify.themeable = window.$docsify.themeable || {};
  window.$docsify.themeable.version = pkgVersion;
  window.$docsify.themeable.semver = pkgVersion.split('.');
  window.$docsify.themeable.util = {
    cssVars: function (options = cssVarsOptions) {
      cssVars(options);
    }
  };
}
