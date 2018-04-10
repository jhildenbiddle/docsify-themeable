// Plugin
// =============================================================================
// Handles state-related class names
export default function(hook, vm) {
    hook.init(function() {
        const hasSpinner = ((window.$docsify || {}).themeable || {}).spinner !== false;

        if (hasSpinner) {
            document.body.classList.add('ready-transition');

            // Timeout required for spinner fade-in
            setTimeout(function() {
                document.body.classList.add('ready-spinner');
            }, 1);

            hook.ready(function() {
                const mainElm = document.querySelector('main');

                mainElm.addEventListener('transitionend', function cb(evt) {
                    document.body.classList.remove('ready-transition', 'ready-spinner');
                    mainElm.removeEventListener('transitionend', cb);
                });
            });
        }
    });
}
