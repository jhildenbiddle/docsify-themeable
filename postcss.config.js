const postcss = require('postcss');

const removeUnsetCustomProperties = postcss.plugin('postcss-remove-unset-custom-properties', (options = {}) => {
    return root => {
        root.walkDecls(decl => {
            const isCustomProp = decl.prop.startsWith('--');
            const isEmpty = decl.value.trim().length === 0;

            if (isCustomProp && isEmpty) {
                decl.remove();
            }
        });
    };
});

module.exports = {
    plugins: [
        removeUnsetCustomProperties,
        require('autoprefixer')({})
    ],
};
