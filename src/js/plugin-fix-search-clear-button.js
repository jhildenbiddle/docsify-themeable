// Plugin
// =============================================================================
// Replaces docsify's "clear search" button:
// - Use a <button> element to allow focus
// - Add aria-label for screen readers
// - Improve icon by sizing properly and applying non-scaling-stroke effect
export default function(hook, vm) {
    hook.ready(function() {
        const oldButton = document.querySelector('.sidebar .search .clear-button');

        if (oldButton) {
            const newButton = document.createElement('button');

            newButton.className = 'clear-button';
            newButton.setAttribute('aria-label', 'Clear search');
            newButton.innerHTML = `
                <svg width="16" height="16" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="black"></circle>
                    <path stroke="white" stroke-width="1.5" d="M4.5,4.5,11.5,11.5" vector-effect="non-scaling-stroke"></path>
                    <path stroke="white" stroke-width="1.5" d="M4.5,11.5,11.5,4.5" vector-effect="non-scaling-stroke"></path>
                </svg>
            `;

            oldButton.parentNode.replaceChild(newButton, oldButton);
        }
    });
}
