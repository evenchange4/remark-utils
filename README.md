# Remark utils

> Reusable utils to build markdown service power by [remarkjs](https://github.com/remarkjs/remark) and [elasticlunr](https://github.com/weixsong/elasticlunr.js).

[![Travis][build-badge]][build]
[![Codecov Status][codecov-badge]][codecov]
[![npm package][npm-badge]][npm]
[![npm downloads][npm-downloads]][npm]

[![prettier][prettier-badge]][prettier]
[![license][license-badge]][license]

## Installation

```bash
$ yarn add remark-utils
```

## Usage

### [mdToHtml](./src/mdToHtml.js)

```js
type MdToHtml = (markdownContent: string, options: *) => string;
```

```js
import { mdToHtml } from 'remark-utils';

const html = mdToHtml('# heading');

// <h1 id="heading"><a href="#heading" aria-hidden class="anchor"><svg aria-hidden="true" height="24" version="1.1" viewBox="0 0 24 24" width="24"><path fill-rule="evenodd" d="..."></path></svg></a>heading</h1>
```

### [mdToElasticlunrIndex](./src/mdToElasticlunrIndex.js)

```js
type IndexingItem = {
  title: string,
  body: string,
  url: string,
};

type MdToElasticlunrIndex = (
  filenames: Array<string>,
  indexItemMapper: (IndexingItem, filename: string) => IndexingItem,
) => string;
```

```js
// Server side
import glob from 'glob';
import { mdToElasticlunrIndex } from 'remark-utils';
const filenames = glob.sync('path-to-md/**/*.md');
const index: string = mdToElasticlunrIndex(filenames, i => i);

// Client side
import { Index } from 'elasticlunr';
const idx = Index.load(JSON.parse(index));
const results = idx
  .search('query', {})
  .map(({ ref }) => idx.documentStore.getDoc(ref))
  .map(({ url, title, body }: IndexingItem) => ({
    url,
    title: highlightQuery(title),
    body: highlightQuery(body),
  }));
```

> Check the [tests](./src/__tests__/mdToElasticlunrIndex.test.js) and [Query from Index](https://github.com/weixsong/elasticlunr.js#5-query-from-index) section for more details.

## API

### Options

[src/utils/defaultOptions.js](./src/utils/defaultOptions.js)

## Use with lazysizes

```js
// Server side preprocess
const base64Json = {
  '../images/AWS_Icons-300x200.png': {
    imagePath: '../images/AWS_Icons-300x200.png',
    width: 300,
    height: 200,
    format: 'png',
    base64: 'data:image/png;base64,mock',
  },
};

// Mapping
const html = mdToHtml(
  `![AWS_Icons-300x200.png](../images/AWS_Icons-300x200.png 'aws')`,
  {
    lazysizes: {
      base64Mapper: (imagepath: string) => base64Json[imagepath],
      srcAttr: 'data-src',
    },
  },
);

// Client side
import('lazysizes').then(({ default: lazysizes }) => {
  lazysizes.init();
});
```

- https://github.com/aFarkas/lazysizes

## Development

- node 11.4.0
- yarn 1.12.3

```bash
$ yarn install --pure-lockfile
```

## Test

```bash
$ yarn run format
$ yarn run eslint
$ yarn run flow
$ yarn run test:watch
$ yarn run build
```

## Publish

```bash
$ npm version patch
$ git push
$ npm run changelog
```

---

## CONTRIBUTING

- ⇄ Pull requests and ★ Stars are always welcome.
- For bugs and feature requests, please create an issue.
- Pull requests must be accompanied by passing automated tests.

## [CHANGELOG](CHANGELOG.md)

## [LICENSE](LICENSE)

[build-badge]: https://travis-ci.com/evenchange4/remark-utils.svg?branch=master
[build]: https://travis-ci.com/evenchange4/remark-utils
[npm-badge]: https://img.shields.io/npm/v/remark-utils.svg?style=flat-square
[npm]: https://www.npmjs.org/package/remark-utils
[codecov-badge]: https://img.shields.io/codecov/c/github/evenchange4/remark-utils.svg?style=flat-square
[codecov]: https://codecov.io/github/evenchange4/remark-utils?branch=master
[npm-downloads]: https://img.shields.io/npm/dt/remark-utils.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/remark-utils.svg?style=flat-square
[license]: http://michaelhsu.mit-license.org/
[prettier-badge]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
