// Plugin
// =============================================================================
// Removes cover auto-generated anchor link wrapper around <h1> content
export default function(hook, vm) {
    hook.doneEach(function() {
        const coverHeaderLink = document.querySelector('.cover h1 > a');

        if (coverHeaderLink) {
            coverHeaderLink.parentNode.innerHTML = coverHeaderLink.innerHTML;
        }
    });
}
