// Plugin
// =============================================================================
// 1. Wraps top-level navbar <li> non-link labels in a <span> with a tabindex
//    attribute to allow touch-based devices to display drop menus on :hover.
// 2. Toggles 'focus-within' class to simulate native :focus-within behavior
export default function(hook, vm) {
    hook.doneEach(function() {
        const navbarItems = Array.apply(null, document.querySelectorAll('body > nav.app-nav > ul > li'));

        navbarItems.forEach(item => {
            const itemMenuElm = item.querySelector('ul');

            if (itemMenuElm) {
                const hasTabIndex    = Array.apply(null, item.children).some(child => child.tabIndex > -1);
                const focusClassName = 'focus-within';

                // Wrap non-link labels
                if (!hasTabIndex) {
                    const wrapElm = document.createElement('span');

                    wrapElm.setAttribute('tabindex', 0);
                    item.insertBefore(wrapElm, itemMenuElm);

                    while(item.childNodes[0] !== wrapElm) {
                        wrapElm.appendChild(item.childNodes[0]);
                    }
                }

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
            }
        });
    });
}
