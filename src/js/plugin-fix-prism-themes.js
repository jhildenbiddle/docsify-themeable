// Plugin
// =============================================================================
// Updates <code> and <pre> class names for Prism.js theme compatibility
export default function(hook, vm) {
    hook.doneEach(function() {
        const preElms = Array.apply(null, document.querySelectorAll('pre[data-lang]'));

        preElms.forEach(preElm => {
            const codeElm    = preElm.querySelector('code');
            const prismClass = `language-${preElm.getAttribute('data-lang')}`;

            preElm.classList.add(prismClass);
            codeElm.classList.add(prismClass);
        });
    });
}
