// @flow
import glob from 'glob';
import mdToElasticlunrIndex from '../mdToElasticlunrIndex';

const identity = i => i;

it('should return correct indexing', () => {
  const filenames = glob.sync('./test-content/tutorial/*.md');
  const indexing = mdToElasticlunrIndex(filenames, identity);
  expect(indexing).toMatchSnapshot();
});

it('should return correct indexing with indexItemMapper', () => {
  const filenames = glob.sync('./test-content/tutorial/*.md');
  const indexItemMapper = (indexItem, filename) => ({ ...indexItem, filename });
  const indexing = mdToElasticlunrIndex(filenames, indexItemMapper);
  expect(indexing).toMatchSnapshot();
});
