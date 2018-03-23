// Plugin
// =============================================================================
// Handles state-related class names
export default function(hook, vm) {
    // Invoked once when the script starts running.
    // Used as CSS hook to detect docsify-themable JavaScript.
    hook.init(function() {
        const loadedTimeout = 5000;

        document.body.classList.add('js-themeable');

        // Docify does not provide a way to detect 404. This timeout ensures
        // that the loading overlay is toggled off if it has not already been
        // done so by hook.doneEach()
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, loadedTimeout);
    });

    // Invoked each time before parsing the Markdown file
    hook.beforeEach(function(content) {
        document.body.classList.remove('loaded');
        return content;
    });

    // Invoked each time after the data is fully loaded
    hook.doneEach(function() {
        document.body.classList.add('loaded');
    });
}
