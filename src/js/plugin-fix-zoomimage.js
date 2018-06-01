// Functions
// =============================================================================
/**
 * Ponyfill for native Element.matches method
 *
 * @param   {object} elm The element to test
 * @param   {string} selector The CSS selector to test against
 * @returns {boolean}
 */
function matchesSelector(elm, selector) {
    const matches = elm.matches || elm.matchesSelector || elm.webkitMatchesSelector || elm.mozMatchesSelector || elm.msMatchesSelector || elm.oMatchesSelector;

    return matches.call(elm, selector);
}


// Plugin
// =============================================================================
// Removes unnecessary <a> wrapper around <h1> content in coverpage
export default function(hook, vm) {
    hook.doneEach(function() {
        const className = 'medium-zoom-image';
        const imageElms = Array.apply(null, document.querySelectorAll(`.${className}`));

        imageElms.forEach(elm => {
            const isLinkImage    = matchesSelector(elm, 'a img');
            const isContentImage = matchesSelector(elm, '.content img');

            if (isLinkImage || !isContentImage) {
                elm.classList.remove(className);
            }
        });
    });
}
