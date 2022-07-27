(function() {
    // Functions
    // =========================================================================
    /**
     * Adds event listeners to change active stylesheet and restore previously
     * activated stylesheet on reload.
     *
     * @example
     *
     * This link:
     *   <a href="#" data-style-href="path/to/file.css" data-style-group="foo">Bar</a>
     * Activates an existing matched <link> (href + group match):
     *   <link rel="stylesheet alternate" data-style-group="foo" href="deep/path/to/file.css" >
     * Generates a new <link> if needed (no href + group match):
     *   <link rel="stylesheet" data-style-group="foo" href="path/to/file.css" >
     * Disables <link> elements that match group but not href
     *   <link rel="stylesheet" data-style-group="foo" href="some/other/file.css" >
     * Ignores <link> elements that do not match href and group
     *   <link rel="stylesheet" data-style-group="bar" href="some/other/file.css" >
     */
    function initStyleSwitcher() {
        var SESSION_STORAGE_KEY = 'activeStylesheetHref';
        var SESSION_VAL_SEPARATOR = '||';

        var isInitialized = false;

        function createLinkedStylesheet(styleHref, styleGroup) {
            var activeElm = document.createElement('link');

            activeElm.setAttribute('rel', 'stylesheet');
            activeElm.setAttribute('href', styleHref);
            activeElm.setAttribute('data-style-group', styleGroup || '');

            document.head.appendChild(activeElm);

            activeElm.addEventListener('load', function linkOnLoad() {
                activeElm.removeEventListener('load', linkOnLoad);
                handleSwitch(styleHref, styleGroup);
            });

            return activeElm;
        }

        function handleSwitch(styleHref, styleGroup) {
            var activeElm = styleGroup
                ? document.querySelector('link[href*="' + styleHref +'"][data-style-group="' + styleGroup + '"]')
                : document.querySelector('link[href*="' + styleHref +'"]');

            if (!activeElm) {
                activeElm = createLinkedStylesheet(styleHref, styleGroup);

                // Stylesheet will call this function after loading is complete
                return;
            }

            // Remove "alternate" keyword and media attribute
            activeElm.setAttribute('rel', (activeElm.rel || '').replace(/\s*alternate/g, '').trim());
            activeElm.removeAttribute('media');

            // Force enable stylesheet (required for some browsers)
            activeElm.disabled = true;
            activeElm.disabled = false;

            // Store active style sheet
            sessionStorage.setItem(SESSION_STORAGE_KEY, styleGroup ? styleHref + SESSION_VAL_SEPARATOR + styleGroup : styleHref);

            var inactiveElms = styleGroup
                ? document.querySelectorAll('link:not([href*="' + styleHref +'"])[data-style-group="' + styleGroup + '"]')
                : document.querySelectorAll('link:not([href*="' + styleHref +'"])');

            // Disable other elms
            for (var i = 0; i < inactiveElms.length; i++) {
                var elm = inactiveElms[i];

                elm.disabled = true;

                // Fix for browsersync and alternate stylesheet updates. Will
                // cause FOUC when switching stylesheets during development, but
                // required to properly apply style updates when alternate
                // stylesheets are enabled.
                if (window.browsersyncObserver) {
                    var linkRel    = elm.getAttribute('rel') || '';
                    var linkRelAlt = linkRel.indexOf('alternate') > -1 ? linkRel : (linkRel + ' alternate').trim();

                    elm.setAttribute('rel', linkRelAlt);
                }
            }

            // CSS custom property ponyfill
            if ((window.$docsify || {}).themeable) {
                window.$docsify.themeable.util.cssVars();
            }
        }

        // Event listeners
        if (!isInitialized) {
            isInitialized = true;

            // Restore active stylesheet
            document.addEventListener('DOMContentLoaded', function() {
                var storedData = sessionStorage.getItem(SESSION_STORAGE_KEY) || '';
                var storedVals = storedData.split(SESSION_VAL_SEPARATOR);
                var styleHref = storedVals[0] || '';
                var styleGroup = storedVals[1] || '';

                if (styleHref) {
                    handleSwitch(styleHref, styleGroup);
                }
            });

            // Update active stylesheet
            document.addEventListener('click', function(evt) {
                var styleHref = evt.target.getAttribute('data-style-href');
                var styleGroup = evt.target.getAttribute('data-style-group');

                if (styleHref) {
                    handleSwitch(styleHref, styleGroup);
                    evt.preventDefault();
                }
            });
        }
    }

    // Main
    // =========================================================================
    initStyleSwitcher();
})();
