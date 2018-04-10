// Plugin
// =============================================================================
// Fixes docsify's incorrect addition of the "ready" state class to the <body>
// element before the ready event has actually fired
export default function(hook, vm) {
    hook.ready(function() {
        document.body.classList.add('ready-fix');
    });
}
