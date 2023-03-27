import { Extensions } from "@esxl/constants";
import { ESLint } from "eslint";
import { join } from "path";
import * as config from "../index";

const rootDir = process.cwd();
const __dirname = join(rootDir, "src", "__tests__");
const fixtures = join(__dirname, "..", "__fixtures__");

describe("index", () => {
  test("it provides a default export", () => {
    expect(config.default).toBeDefined();
  });

  describe("Given ESLint is configured with the `@esxl/eslint-config-base` configuration", () => {
    let eslint: ESLint;
    beforeAll(() => {
      eslint = new ESLint({
        cwd: rootDir,
        baseConfig: config.default,
        useEslintrc: false,
      });
    });

    test.each([Extensions.JavaScript, Extensions.TypeScript])(
      "When it runs against a file with valid code, Then it does not return any errors or warnings (%s)",
      async (extension) => {
        expect.hasAssertions();

        const [result] = await eslint.lintFiles([
          join(fixtures, `simple.${extension}`),
        ]);
        expect(result).toMatchObject({
          errorCount: 0,
          warningCount: 0,
        });
      }
    );

    test.each([Extensions.JavaScript, Extensions.TypeScript])(
      "When it runs against a file with code that uses DOM APIs, Then it returns with an error (%s)",
      async (extension) => {
        expect.hasAssertions();

        const [result] = await eslint.lintFiles([
          join(fixtures, `DOM.${extension}`),
        ]);
        expect(result).toMatchObject({
          errorCount: 1,
          warningCount: 0,
        });
        expect(result.messages[0]).toMatchSnapshot();
      }
    );

    test.each([Extensions.JavaScript, Extensions.TypeScript])(
      "When it runs against a file with code that uses CommonJS APIs, Then it returns with an error (%s)",
      async (extension) => {
        expect.hasAssertions();

        const [result] = await eslint.lintFiles([
          join(fixtures, `commonjs.${extension}`),
        ]);
        expect(result).toMatchObject({
          errorCount: 2,
          warningCount: 0,
        });
        expect(result.messages[0]).toMatchSnapshot();
      }
    );

    test.each([Extensions.CommonJS])(
      "When it runs against a file with code that uses CommonJS APIs, Then it returns without an error (%s)",
      async (extension) => {
        expect.hasAssertions();

        const [result] = await eslint.lintFiles([
          join(fixtures, `commonjs.${extension}`),
        ]);
        expect(result).toMatchObject({
          errorCount: 0,
          warningCount: 0,
        });
      }
    );

    describe('And the file exists within a directory named "__tests__"', () => {
      test.each([Extensions.TypeScript /*Extensions.TypeScript_JSX*/])(
        "When it runs against a TypeScript test file with valid code, Then it does not return any errors or warnings (%s)",
        async (extension) => {
          expect.hasAssertions();

          const [result] = await eslint.lintFiles([
            join(__dirname, `jest-litmus.test.${extension}`),
          ]);

          expect(result).toMatchObject({
            errorCount: 0,
            warningCount: 0,
          });
        }
      );
    });
  });
});
