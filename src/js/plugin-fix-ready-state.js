// Plugin
// =============================================================================
// Fixes docsify's incorrect addition of the "ready" state class to the <body>
// element before the ready event has actually fired
export default function(hook, vm) {
    // 404 Fix
    hook.mounted(function() {
        const contentElm = document.querySelector('.content');
        const readyCheck = setInterval(function() {
            if (contentElm.textContent.length) {
                document.body.classList.add('ready-fix');
                clearInterval(readyCheck);
            }
        }, 250);
    });

    hook.ready(function() {
        document.body.classList.add('ready-fix');
    });
}
