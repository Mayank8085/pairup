module.exports = {
  root: true,
  extends: '@react-native-community',
  // eslint prettier fight fix
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  extends: ['plugin:prettier/recommended'],
};
