// Plugin
// =============================================================================
// Removes unnecessary <a> wrapper around <h1> content in coverpage
export default function(hook, vm) {
    const matchesSelector = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector;

    hook.doneEach(function() {
        const className = 'medium-zoom-image';
        const imageElms = Array.apply(null, document.querySelectorAll(`.${className}`));

        imageElms.forEach(elm => {
            const isLinkImage    = matchesSelector.call(elm, 'a img');
            const isContentImage = matchesSelector.call(elm, '.content img');

            if (isLinkImage || !isContentImage) {
                const cloneElm = elm.cloneNode(true);

                // Replace elm with clone to remove event listener
                elm.parentNode.replaceChild(cloneElm, elm);
                cloneElm.classList.remove(className);
            }
        });
    });
}
