// @flow
import glob from 'glob';
import mdToElasticlunrIndex from '../mdToElasticlunrIndex';

const identity = i => i;

it('should return correct indexing', () => {
  const filenames = glob.sync('./test-content/tutorial/*.md');
  const indexing = mdToElasticlunrIndex(filenames, identity);
  expect(indexing).toMatchSnapshot();
});
