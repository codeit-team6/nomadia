/** @type {import("prettier").Config} */
module.exports = {
  semi: true, 
  singleQuote: true,
  jsxSingleQuote: false, // JSX에서는 " 큰따옴표 사용
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  arrowParens: 'always',
  endOfLine: 'auto', 
  bracketSpacing: true,
  bracketSameLine: false,
  plugins: ['prettier-plugin-tailwindcss'], 
}
