// @flow
import remark from 'remark';
import remarkGridTables from 'remark-grid-tables';
import remarkHtml from 'remark-html';
import remarkPrismjs from 'gatsby-remark-prismjs';
import remarkAutolink from 'gatsby-remark-autolink-headers';
import remarkStrip from 'remark-strip-html';
import { type IndexingItem, type Ast } from './type.flow';
import defaultOptions from './defaultOptions';
import remarkIndexing from './remark-indexing';

const extractIndexingFromMd = (
  markdownContent: string,
): Array<IndexingItem> => {
  let indexingItems: Array<IndexingItem> = [];

  remark()
    .use(remarkGridTables)
    .use(() => (markdownAST: Ast) =>
      remarkAutolink({ markdownAST }, { icon: '', classNam: 'anchor' }),
    )
    .use(() => (markdownAST: Ast) =>
      remarkPrismjs({ markdownAST }, defaultOptions.prismjs),
    )
    .use(remarkStrip)
    .use(() => (markdownAST: Ast) => {
      indexingItems = remarkIndexing(markdownAST);
      return markdownAST;
    })
    .use(remarkHtml)
    .processSync(markdownContent);

  return indexingItems;
};

export default extractIndexingFromMd;
