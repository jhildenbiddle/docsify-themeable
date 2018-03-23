// Plugin
// =============================================================================
// Toggles "show" class on search wrapper element when results are displayed,
// allowing sidebar navigation visibility to be toggle on/off
export default function(hook, vm) {
    hook.ready(function() {
        const searchElm      = document.querySelector('.sidebar .search');
        const searchInputElm = document.querySelector('.sidebar .search input[type=search]');

        function toggleSearchShowClass() {
            if (searchInputElm.value.length) {
                searchElm.classList.add('show');
            }
            else {
                searchElm.classList.remove('show');
            }
        }

        if (searchElm && searchInputElm) {
            searchInputElm.addEventListener('input', toggleSearchShowClass);

            // A timeout is required for the change event due to a 100ms timeout
            // used in the search plugin. The timeout used here ensures that the
            // input field has been updated before the class toggle occurs.
            // https://github.com/QingWei-Li/docsify/blob/master/src/plugins/search/component.js#L157
            searchInputElm.addEventListener('change', function() {
                setTimeout(() => toggleSearchShowClass(), 120);
            });
        }
    });
}
