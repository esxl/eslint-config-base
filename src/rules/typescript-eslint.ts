import type { Linter } from "eslint";

/**
 * `@typescript-eslint/eslint-plugin` rules
 *
 * @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
 */
export default {
  "@typescript-eslint/consistent-type-assertions": "warn",
  "@typescript-eslint/no-array-constructor": "warn",
  "@typescript-eslint/no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTaggedTemplates: true,
      allowTernary: true,
    },
  ],
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      args: "none",
      ignoreRestSiblings: true,
    },
  ],
  "@typescript-eslint/no-use-before-define": [
    "warn",
    {
      classes: false,
      functions: false,
      typedefs: false,
      variables: false,
    },
  ],
  "@typescript-eslint/no-useless-constructor": "warn",
  "default-case": "off",
  "no-array-constructor": "off",
  "no-dupe-class-members": "off",
  /**
   * Although the `typescript-eslint` project recommends against turning this setting on, without it we would
   * incorrectly mark code that accesses unknown globals as valid. For example, lint would succeed without an error
   * when run against code like `document.getElementById("#foo")`, even when `env.browser` is set to `false`.
   *
   * @see https://typescript-eslint.io/linting/troubleshooting#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
   */
  "no-undef": "error",
  "no-unused-vars": "off",
  "no-use-before-define": "off",
  "no-useless-constructor": "off",
} as Linter.RulesRecord;
