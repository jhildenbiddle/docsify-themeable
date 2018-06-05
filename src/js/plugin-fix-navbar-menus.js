// Functions
// =============================================================================
/**
 * Wraps direct descendant text nodes in the HTML tag specified with a tab
 * index attribute.
 *
 * @param {object} elm The element containing text nodes
 * @param {string} wrapTag The tag to wrap text nodes with
 * @param {number|string} [tabIndex=null] The wrapTag tabIndex value
 */
function wrapTextNodes(elm, wrapTag, tabIndex = null) {
    const hasTextNodes = elm.childNodes[0].nodeType === 3;
    const menuElm      = elm.querySelector('ul');

    if (hasTextNodes && menuElm) {
        const hasChildWithTabIndex = Array.apply(null, elm.children).some(child => child.tabIndex > -1).length;

        // Wrap non-link labels
        if (!hasChildWithTabIndex) {
            const wrapElm = document.createElement('span');

            if (tabIndex !== null) {
                wrapElm.setAttribute('tabindex', tabIndex);
            }

            elm.insertBefore(wrapElm, menuElm);

            while(elm.childNodes[0] !== wrapElm) {
                wrapElm.appendChild(elm.childNodes[0]);
            }
        }
    }
}

// Plugin
// =============================================================================
// 1. Wraps top-level navbar <li> non-link labels in a <span> with a tabindex
//    attribute to allow touch-based devices to display drop menus on :hover.
// 2. Toggles 'focus-within' class to simulate native :focus-within behavior
export default function(hook, vm) {
    hook.doneEach(function() {
        const navbarItems  = Array.apply(null, document.querySelectorAll('body > nav.app-nav > ul > li'));
        const sidebarItems = Array.apply(null, document.querySelectorAll('.sidebar > nav > ul > li'));

        // Standard navigation bar
        navbarItems.forEach(item => {
            const focusClassName = 'focus-within';

            wrapTextNodes(item, 'span', 0);

            // Simulate :focus-within
            item.addEventListener('focusin', evt => {
                if (item.contains(document.activeElement)) {
                    item.classList.add(focusClassName);
                }
            });

            item.addEventListener('focusout', evt => {
                if (!item.contains(document.activeElement)) {
                    item.classList.remove(focusClassName);
                }
            });
        });

        // Merged nav bar in sidebar via 'mergeNavbar' option
        sidebarItems.forEach(item => {
            wrapTextNodes(item, 'span');
        });
    });
}
