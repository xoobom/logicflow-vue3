module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'space-before-function-paren': 0, //方法后是否空格
    semi: 1, //结尾是否有分号
    quotes: [1, 'single'],
    'no-tabs': 'off',
    'no-new': 0,
    'spaced-comment': 0, //注释后是否有空格
    'comma-spacing': 0, //逗号后是否有空格
    eqeqeq: 0, //==还是===
    // 'vue/max-attributes-per-line': [2, { singleline: 20, multiline: { max: 1, allowFirstLine: false } }], // 每行最大属性
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'no-unused-vars': 'off',
    'vue/no-template-shadow': 'off',
    'vue/require-default-prop': 'off', //子组件属性默认值
    'vue/no-unused-vars': 'off',
    'vue/this-in-template': 'off',
    'vue/require-prop-types': 'off',
    'vue/valid-v-bind': 'off',
    'no-useless-escape': 'off',
    'vue/no-unused-components': 'off',
    'vue/no-parsing-error': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'vue/order-in-components': 'off',
    'no-irregular-whitespace': 'off',
    'no-prototype-builtins': 'off',
    'no-self-assign': 'off',
    'vue/require-prop-type-constructor': 'off',
    'no-dupe-keys': 'off',
    'no-redeclare': 'off',
    'vue/valid-v-else': 'off',
    'vue/require-valid-default-prop': 'off',
    'no-empty': 'off',
    'vue/no-dupe-keys': 'off',
    'vue/no-duplicate-attributes': [
      'error',
      {
        allowCoexistClass: true,
        allowCoexistStyle: true,
      },
    ],
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/return-in-computed-property': 'off',
    'no-undef': 'off',
    'vue/prop-name-casing': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-cond-assign': 'off',
    'no-constant-condition': 'off',
    'getter-return': 'off',
    'comma-dangle': [2, 'always-multiline'], //数组和对象键值对最后一个有逗号
    'no-debugger': 'off',
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/attribute-hyphenation': 'off', //父组件给子组件的属性是否横杠连接
    'vue/no-v-html': 'off',
    'global-require': 0, //避免控制台warning unexpected require()
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
