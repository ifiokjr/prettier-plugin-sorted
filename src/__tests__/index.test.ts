import { format } from 'prettier';

import * as prettierPluginSorted from '..';

const unsortedImports = `
import Runner from 'run';
import {a} from './foo';
import {b, B, c, C} from '@z';
import {Splat} from '@splat/anything';
import {b} from '@alias';
import a from 'abc';
import first from '@first';
`;

// Mock the returned tsconfig json file.
jest.mock('tsconfig-resolver', () => ({
  tsconfigResolver: () => ({
    path: '/any/path/',
    exists: true,
    config: {
      compilerOptions: {
        paths: {
          '@alias': [],
          '@z': [],
          '@z/*': [],
          '@run': [],
          '@splat/*': [],
          '*/simple': [],
          run: [],
        },
      },
    },
  }),
  CacheStrategy: { Directory: 'directory' },
}));

test('sorts the typescript imports', () => {
  expect(
    format(unsortedImports, {
      plugins: [prettierPluginSorted],
      parser: 'typescript',
    }),
  ).toMatchInlineSnapshot(`
    "import first from \\"@first\\";
    import a from \\"abc\\";

    import { b } from \\"@alias\\";
    import { Splat } from \\"@splat/anything\\";
    import { B, C, b, c } from \\"@z\\";
    import Runner from \\"run\\";

    import { a } from \\"./foo\\";
    "
  `);
});

test('sorts the javascript imports', () => {
  expect(
    format(unsortedImports, {
      plugins: [prettierPluginSorted],
      parser: 'babel',
    }),
  ).toMatchInlineSnapshot(`
    "import first from \\"@first\\";
    import a from \\"abc\\";

    import { b } from \\"@alias\\";
    import { Splat } from \\"@splat/anything\\";
    import { B, C, b, c } from \\"@z\\";
    import Runner from \\"run\\";

    import { a } from \\"./foo\\";
    "
  `);
});
