// Plugin
// =============================================================================
// Adds tabindex to top-level navbar <li> items that contain a non-link label.
// This allows touch-based devices to display drop menus on :hover.
export default function(hook, vm) {
    hook.ready(function() {
        const navbarItems = Array.apply(null, document.querySelectorAll('body > nav.app-nav > ul > li'));

        navbarItems.forEach(item => {
            const hasLink = Array.apply(null, item.children).filter(child => child.tagName.toLowerCase() === 'a').length;
            const hasMenu = Array.apply(null, item.children).filter(child => child.tagName.toLowerCase() === 'ul').length;

            if (!hasLink && hasMenu) {
                item.setAttribute('tabindex', 0);
            }
        });
    });
}
