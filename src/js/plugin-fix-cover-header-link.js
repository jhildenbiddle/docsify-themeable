// Plugin
// =============================================================================
// Removes link wrapper around <h1> content in coverpage
export default function(hook, vm) {
    hook.doneEach(function() {
        const coverHeaderLink = document.querySelector('.cover h1 > a');

        if (coverHeaderLink) {
            coverHeaderLink.parentNode.innerHTML = coverHeaderLink.innerHTML;
        }
    });
}
