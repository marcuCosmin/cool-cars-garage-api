const js = require("@eslint/js")
const globals = require("globals")
const tseslint = require("typescript-eslint")
const importPlugin = require("eslint-plugin-import")

module.exports = tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      ...tseslint.configs.recommended,
      js.configs.recommended,
      importPlugin.flatConfigs.recommended
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node
    },

    settings: {
      "import/resolver": {
        alias: {
          map: [["", "./public"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    },
    rules: {
      "no-useless-assignment": "error",
      "require-await": "error",
      "prefer-destructuring": "error",
      "prefer-arrow-callback": "error",
      "no-useless-return": "error",
      "no-unneeded-ternary": "error",
      "no-nested-ternary": "error",
      "no-empty-function": "error",
      "no-else-return": "error",
      "func-style": ["error", "expression"],
      "curly": ["error", "all"],
      "eqeqeq": "error",
      "camelcase": "error",
      "import/no-default-export": "error",
      "import/default": "off",
      "import/no-duplicates": "error"
    }
  }
)
