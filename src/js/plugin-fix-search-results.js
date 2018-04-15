// Plugin
// =============================================================================
// Toggles "show" class on search wrapper element when results are displayed,
// allowing sidebar navigation visibility to be toggle on/off
export default function(hook, vm) {
    hook.ready(function() {
        const searchElm      = document.querySelector('.sidebar .search');
        const searchInputElm = document.querySelector('.sidebar .search input[type=search]');
        const searchClearElm = document.querySelector('.sidebar .search .clear-button');

        if (searchElm) {
            // Remove "show" class on clear button click
            searchElm.addEventListener('click', function(evt) {
                const isClearButton = evt.target === searchClearElm || searchClearElm.contains(evt.target);

                if (isClearButton) {
                    searchElm.classList.remove('show');
                    searchInputElm.focus();
                }
            });
        }

        if (searchInputElm) {
            // Toggle "show" class on input
            searchInputElm.addEventListener('input', function(evt) {
                if (searchInputElm.value.length) {
                    searchElm.classList.add('show');
                }
                else {
                    searchElm.classList.remove('show');
                }
            });
        }
    });
}
