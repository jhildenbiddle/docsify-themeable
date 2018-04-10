// Plugin
// =============================================================================
// Adds markdown table renderer for use with responsive table CSS
export default function(hook, vm) {
    hook.init(function() {
        const isEnabled = ((window.$docsify || {}).themeable || {}).responsiveTables !== false;

        if (isEnabled) {
            const markdown = window.$docsify.markdown = window.$docsify.markdown || {};
            const renderer = markdown.renderer = markdown.renderer || {};

            markdown.smartypants = markdown.smartypants || true;
            renderer.table = renderer.table || function(header, body) {
                let tableHtml = `
                    <div class="table-wrapper">
                        <table>
                            <thead>${header}</thead>
                            <tbody>${body}</tbody>
                        </table>
                    </div>`;

                try {
                    const div        = document.createElement('div');
                    const styleElm   = document.head.appendChild(document.createElement('style'));
                    const styleSheet = styleElm.sheet;
                    const tableId    = '_' + Math.random().toString(36).substr(2, 9);

                    div.innerHTML = tableHtml;

                    const tableElm = div.querySelector('table');
                    const thElms   = Array.apply(null, tableElm.getElementsByTagName('th'));
                    const thTitles = thElms.map(function(thElm) {
                        return thElm.innerHTML.replace('&nbsp;', ' ');
                    });

                    thTitles.forEach((title, i) => {
                        const rule = `#${tableId} td:nth-child(${i + 1})::before{content:"${title}";}`;

                        styleSheet.insertRule(rule, styleSheet.cssRules.length);
                    });

                    tableElm.id = tableId;
                    tableHtml = div.innerHTML;
                }
                catch(e) {
                    // eslint-disable-next-line
                    console.log('Failed to render responsive table: ' + e);
                }

                return tableHtml;
            };
        }
    });
}
