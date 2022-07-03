module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'sort-keys-fix',
        'sort-class-members',
        'unused-imports',
        // 'security'
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'prettier'
        // 'plugin:security/recommended'
    ],
    env: {
        browser: false,
        node: true,
        es6: true,
        jest: false
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    },
    rules: {
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'warn',
        'sort-keys-fix/sort-keys-fix': 'error',
        'sort-class-members/sort-class-members': [ 'error', {
            order: [
              '[static-properties]',
              '[static-methods]',
              '[properties]',
              '[conventional-private-properties]',
              'constructor',
              '[conventional-private-methods]',
              '[methods]'
            ],
            accessorPairPositioning: 'getThenSet'
        }],
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports-ts': 2,
        'unused-imports/no-unused-vars-ts': 2
    }
}