module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "prettier"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-use-before-define": "off",
    "vue/no-dupe-keys": "off",
    "vue/multi-word-component-names": "off"
  }
}
