module.exports = {
    'env': {
        'browser' : true,
        'commonjs': true,
        'es6'     : true,
        'node'    : true
    },
    'extends': [
        'eslint:recommended'
    ],
    'ignorePatterns': [
        'dist'
    ],
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType' : 'module'
    },
    'plugins': [
        'html'
    ],
    'rules': {
        'array-bracket-spacing'      : ['error', 'never'],
        'array-callback-return'      : ['error'],
        'block-scoped-var'           : ['error'],
        'block-spacing'              : ['error', 'always'],
        'curly'                      : ['error'],
        'dot-notation'               : ['error'],
        'eqeqeq'                     : ['error'],
        'indent'                     : ['error', 4],
        'no-console'                 : ['warn'],
        'no-floating-decimal'        : ['error'],
        'no-implicit-coercion'       : ['error'],
        'no-implicit-globals'        : ['error'],
        'no-loop-func'               : ['error'],
        'no-return-assign'           : ['error'],
        'no-template-curly-in-string': ['error'],
        'no-unneeded-ternary'        : ['error'],
        'no-unused-vars'             : ['error', { 'args': 'none' }],
        'no-useless-computed-key'    : ['error'],
        'no-useless-return'          : ['error'],
        'no-var'                     : ['error'],
        'prefer-const'               : ['error'],
        'quotes'                     : ['error', 'single'],
        'semi'                       : ['error', 'always']
    },
    'overrides': [
        {
            'files': ['docs/assets/js/*.js'],
            'parserOptions': {
                'ecmaVersion': 5,
                'sourceType': 'script'
            },
            'env': {
                'commonjs': false,
                'es6'     : false,
                'node'    : false
            },
            'rules': {
                'no-var'      : 'off',
                'prefer-const': 'off'
            }
        }
    ]
};
