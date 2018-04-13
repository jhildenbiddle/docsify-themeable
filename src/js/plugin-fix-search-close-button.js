// Plugin
// =============================================================================
// Toggles "show" class on search wrapper element when results are displayed,
// allowing sidebar navigation visibility to be toggle on/off
export default function(hook, vm) {
    hook.ready(function() {
        const closeButtonElm = document.querySelector('.search .clear-button');

        if (closeButtonElm) {
            closeButtonElm.innerHTML = `
                <svg width="16" height="16" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="black"></circle>
                    <path stroke="white" stroke-width="1.5" d="M4.5,4.5,11.5,11.5" vector-effect="non-scaling-stroke"></path>
                    <path stroke="white" stroke-width="1.5" d="M4.5,11.5,11.5,4.5" vector-effect="non-scaling-stroke"></path>
                </svg>
            `;
        }
    });
}
