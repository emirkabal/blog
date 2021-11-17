module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [],
  rules: {
    'no-use-before-define': 'off',
    'vue/no-dupe-keys': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
