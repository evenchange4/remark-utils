// @flow
import * as Modules from '../index';

it('should expose main functions', () => {
  expect(Modules).toHaveProperty('mdToElasticlunrIndex');
  expect(Modules).toHaveProperty('mdToHtml');
});

it('should expose utils functions', () => {
  expect(Modules).toHaveProperty('concatBody');
  expect(Modules).toHaveProperty('defaultOptions');
  expect(Modules).toHaveProperty('extractIndexingFromMd');
  expect(Modules).toHaveProperty('remarkIndexing');
});
