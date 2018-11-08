// @flow
import fs from 'fs';
import elasticlunr from 'elasticlunr';
import { type IndexingItem } from './utils/type.flow';
import extractIndexingFromMd from './utils/extractIndexingFromMd';

export const mdToElasticlunrIndex = (
  filenames: Array<string>,
  indexItemMapper: (IndexingItem, filename: string) => IndexingItem,
): string => {
  // Note: use reduce to flatten nest array
  const indexingItems = filenames.reduce(
    (acc, filename) => [
      ...acc,
      ...extractIndexingFromMd(fs.readFileSync(filename, 'utf8')).map(
        (indexItem: IndexingItem) => indexItemMapper(indexItem, filename),
      ),
    ],
    [],
  );

  const elasticlunrIndex = elasticlunr();
  elasticlunrIndex.setRef('url');
  elasticlunrIndex.addField('url');
  elasticlunrIndex.addField('title');
  elasticlunrIndex.addField('body');
  indexingItems.forEach(indexingItem => elasticlunrIndex.addDoc(indexingItem));

  return JSON.stringify(elasticlunrIndex);
};

export default mdToElasticlunrIndex;
