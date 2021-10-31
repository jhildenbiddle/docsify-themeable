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
     *   <a href="#" data-link-href="path/to/file.css">Bar</a>
     * Will activate this existing link:
     *   <link rel="stylesheet alternate" data-style-switcher href="deep/path/to/file.css" >
     * Or generate this active link:
     *   <link rel="stylesheet" data-style-switcher href="path/to/file.css" >
     */
    function initStyleSwitcher() {
        var isInitialized     = false;
        var sessionStorageKey = 'activeStylesheetHref';

        function handleSwitch(activeHref) {
            var activeElm = document.querySelector('link[href*="' + activeHref +'"]');

            if (!activeElm && activeHref) {
                activeElm = document.createElement('link');
                activeElm.setAttribute('rel', 'stylesheet');
                activeElm.setAttribute('data-style-switcher', '');
                activeElm.setAttribute('href', activeHref);

                document.head.appendChild(activeElm);

                activeElm.addEventListener('load', function linkOnLoad() {
                    activeElm.removeEventListener('load', linkOnLoad);
                    setActiveLink(activeElm);
                });
            }
            else if (activeElm) {
                setActiveLink(activeElm);
            }
        }

        function setActiveLink(activeElm) {
            var activeHref   = activeElm.getAttribute('href');
            var inactiveElms = document.querySelectorAll('link[data-style-switcher]:not([href*="' + activeHref +'"])');

            // Remove "alternate" keyword and media attribute
            activeElm.setAttribute('rel', (activeElm.rel || '').replace(/\s*alternate/g, '').trim());
            activeElm.removeAttribute('media');

            // Force enable stylesheet (required for some browsers)
            activeElm.disabled = true;
            activeElm.disabled = false;

            // Store active style sheet
            sessionStorage.setItem(sessionStorageKey, activeHref);

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
                var activeHref = sessionStorage.getItem(sessionStorageKey);

                if (activeHref) {
                    handleSwitch(activeHref);
                }
            });

            // Update active stylesheet
            document.addEventListener('click', function(evt) {
                var isStyleSwitch = evt.target.hasAttrbite('data-style-switch');

                if (isStyleSwitch) {
                    var dataHref  = evt.target.getAttribute('data-link-href');

                    handleSwitch(dataHref);
                    evt.preventDefault();
                }
            });
        }
    }

    // Main
    // =========================================================================
    initStyleSwitcher();
})();
