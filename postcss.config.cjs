const removeUnsetCustomProperties = (options = {}) => ({
    postcssPlugin: 'postcss-remove-unset-custom-properties',
    Once (root, { result }) {
        root.walkDecls(decl => {
            const isCustomProp = decl.prop.startsWith('--');
            const isEmpty = decl.value.trim().length === 0;

            if (isCustomProp && isEmpty) {
                decl.remove();
            }
        });
    }
});

removeUnsetCustomProperties.postcss = true;

module.exports = {
    plugins: [
        removeUnsetCustomProperties,
        require('autoprefixer')({})
    ],
};
