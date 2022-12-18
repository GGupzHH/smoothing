export default  {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: [
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 1,
    'no-undef': 1,
    'no-var': 'error',
    'no-trailing-spaces': 2,
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'never'],
    'no-irregular-whitespace': 2,
    'no-multi-spaces': 1,
    'object-property-newline': ['error'],
    'key-spacing': 'error',
    'object-curly-spacing': ['error','always'],
    'block-spacing': ['error', 'always'],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'space-before-function-paren': [
      'error',
      'never'
    ],
    'keyword-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'space-infix-ops': [
      'error',
      {
        'int32Hint':
        false
      }
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        'exceptions': ['-', '+']
      }
    ],
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'template-curly-spacing': ['error', 'always'],
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    camelcase: ['error', { properties: 'never' }],
    indent: ['warn', 2, { SwitchCase: 1 }]
  }
}