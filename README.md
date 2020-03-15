# prettier-plugin-sorted

[![GitHub Actions Build Status](https://github.com/ifiokjr/prettier-plugin-sorted/workflows/Node%20CI/badge.svg)](https://github.com/ifiokjr/prettier-plugin-sorted/actions?query=workflow%3A%22Node+CI%22)
[![Version][version]][npm]
[![Weekly Downloads][downloads-badge]][npm]
[![Typed Codebase][typescript]](./src/index.ts)
![MIT License][license]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<br />

> An elegant prettier plugin for sorting your imports. It automatically checks you typescript tsconfig configuration and sorts aliases by default.

<br />

## Table of Contents

- [prettier-plugin-sorted](#prettier-plugin-sorted)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Setup](#setup)
  - [Demo](#demo)
  - [Versioning](#versioning)
  - [License](#license)
  - [Contributors](#contributors)
  - [Acknowledgements](#acknowledgements)

## Usage

`prettier-plugin-sorted` is a [`prettier`](https://prettier.io) plugin for automatically sorting all you JavaScript and TypeScript imports. It uses `import-sort` and allows for a zero configuration setup which should be sufficient for most setups.

Sort the modules in the following order.

- Imports with no members are left unsorted at the top of the file. These tend to have side effects and their order is important. `import 'tolu';`
- Node module imports. `import { join } from 'path';`
- Absolute module imports (but not aliased). `import main from 'main';`
- Aliased imports taken from the `tsconfig.json` and `extraAliases` setting, but excluding `ignoredAliases`.
- Relative module imports.
- Bottom imports, which are set in the settings object as `bottomAliases`. These group together absolute paths with relative, placing the absolute paths above the relative.

An example is shown below.

```ts
// Imports with no members are left unsorted since they may have side effects.
import 'dotenv';
import './my-side-effect';
import 'firebase/auth';

// Built in node module imports come next
import { join } from 'path';

// Absolute imports
import Awesome from 'awesome-package';
import { B, C } from 'bcde';

// Aliased imports
import MyAlias from '@my-alias';
import { Simple } from 'simple';

// Relative imports
import { DeepRelative } from '../../deep/relative';
import Relative from './relative';

// Bottom imports
import Bottom from '@bottom';
import { relativeBottom } from './relative/bottom';
```

<br />

### Setup

First, install the plugin and the required parser:

```bash
npm install --save-dev prettier-plugin-sorted prettier
```

Or if you're using Yarn.

```bash
yarn add -D prettier-plugin-sorted prettier
```

Add the plugin to your `prettier` configuration.

`.prettierrc.json`

```json
{
  "plugins": ["prettier-plugin-sorted"]
}
```

Or inside your project's `package.json` file.

```json
{
  "prettier": {
    "plugins": ["prettier-plugin-sorted"]
  }
}
```

If you would like to customise the setup you can add the `importSort` field to you `package.json` file. A better explanation on what each configuration option does is available [**here**](https://github.com/ifiokjr/import-sort-style-custom#options).

```json5
"importSort": {
  ".js, jsx, .ts, .tsx": {
    "options": {
      "cacheStrategy": "directory",
      "wildcardAtStart": false,
      "extraAliases": [],
      "ignoredAliases": [],
      "bottomAliases": []
    }
  }
}
```

<br />

## Demo

The following animated flow shows what it's like when this is setup with prettier in your editor.

![Demo Screen flow](https://raw.githubusercontent.com/ifiokjr/import-sort-style-custom/master/assets/demo.gif 'Demonstration with prettier')

<br />

## Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see the
[tags on this repository](https://github.com/ifiokjr/prettier-plugin-sorted/tags).

<br />

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://ifiokjr.com"><img src="https://avatars2.githubusercontent.com/u/1160934?v=4" width="100px;" alt=""/><br /><sub><b>Ifiok Jr.</b></sub></a><br /><a href="https://github.com/ifiokjr/prettier-plugin-sorted/commits?author=ifiokjr" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

[version]: https://flat.badgen.net/npm/v/prettier-plugin-sorted
[npm]: https://npmjs.com/package/prettier-plugin-sorted
[license]: https://flat.badgen.net/badge/license/MIT/purple
[size]: https://bundlephobia.com/result?p=#prettier-plugin-sorted
[size-badge]: https://flat.badgen.net/bundlephobia/minzip/prettier-plugin-sorted
[typescript]: https://flat.badgen.net/badge/icon/TypeScript/?icon=typescript&label&labelColor=blue&color=555555
[downloads-badge]: https://badgen.net/npm/dw/prettier-plugin-sorted/red?icon=npm

## Acknowledgements

- This plugin builds on the good work of [`prettier-plugin-import-sort`](https://github.com/ggascoigne/prettier-plugin-import-sort/blob/master/src/index.js) with a sharper focus on typescript projects.
