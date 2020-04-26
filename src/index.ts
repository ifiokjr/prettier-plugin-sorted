import path from 'path';

import sortImports from 'import-sort';
import { IConfigByGlobs, getConfig } from 'import-sort-config';
import { Plugin } from 'prettier';
import { parsers as javascriptParsers } from 'prettier/parser-babel';
import { parsers as typescriptParsers } from 'prettier/parser-typescript';
import invariant from 'tiny-invariant';

const msg = (message: string) => `prettier-config-monots SORTER: ${message}`;

const DEFAULT_PARSER = 'typescript';
const DEFAULT_STYLE = 'custom';

export const defaultConfig: IConfigByGlobs = {
  '.js, .jsx, .es6, .es, .mjs, .ts, .tsx': {
    parser: DEFAULT_PARSER,
    style: DEFAULT_STYLE,
    options: {},
  },
};

const getAndCheckConfig = (extension: string, fileDirectory: string) => {
  const resolvedConfig = getConfig(extension, fileDirectory, defaultConfig);
  invariant(
    resolvedConfig,
    msg(`No configuration found for file type ${extension}`),
  );

  const rawParser = resolvedConfig.config.parser;
  const rawStyle = resolvedConfig.config.style;

  invariant(rawParser, `No parser defined for file type ${extension}`);
  invariant(rawStyle, `No style defined for file type ${extension}`);

  const { parser, style } = resolvedConfig;

  invariant(parser, `Parser "${rawParser}" could not be resolved`);
  invariant(
    style ?? style === rawStyle,
    `Style "${rawStyle}" could not be resolved`,
  );

  return resolvedConfig;
};

const organizeImports = (unsortedCode: string, extension: string) => {
  // this throw exceptions up to prettier
  const config = getAndCheckConfig(
    extension,
    path.resolve(__dirname, '..', '..'),
  );
  const {
    parser = DEFAULT_PARSER,
    style = DEFAULT_STYLE,
    config: rawConfig,
  } = config;

  const sortResult = sortImports(
    unsortedCode,
    parser,
    style,
    `dummy${extension}`,
    rawConfig.options,
  );
  return sortResult.code;
};

export const parsers: Plugin['parsers'] = {
  typescript: {
    ...typescriptParsers.typescript,
    preprocess(text) {
      return organizeImports(text, '.ts');
    },
  },
  babel: {
    ...javascriptParsers.babel,
    preprocess(text) {
      return organizeImports(text, '.js');
    },
  },
};
