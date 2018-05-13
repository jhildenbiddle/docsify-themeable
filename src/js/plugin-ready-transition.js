// Plugin
// =============================================================================
// Displays a loading indicator while waiting for the site to initialize and a
// fade transition after initialization is complete
export default function(hook, vm) {
    hook.init(function() {
        const isEnabled = ((window.$docsify || {}).themeable || {}).readyTransition !== false;

        if (isEnabled) {
            document.body.classList.add('ready-transition');

            // Timeout required for spinner fade-in
            setTimeout(function() {
                document.body.classList.add('ready-spinner');
            }, 1);

            hook.ready(function() {
                const mainElm = document.querySelector('main');

                mainElm.addEventListener('transitionend', function cb(evt) {
                    // IE classList only handles one class per call
                    document.body.classList.remove('ready-transition');
                    document.body.classList.remove('ready-spinner');
                    mainElm.removeEventListener('transitionend', cb);
                });
            });
        }
    });
}
