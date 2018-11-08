// @flow
import remark from 'remark';
import remarkGridTables from 'remark-grid-tables';
import remarkHtml from 'remark-html';
import remarkPrismjs from 'gatsby-remark-prismjs';
import remarkAutolink from 'gatsby-remark-autolink-headers';
import defaultOptions from './utils/defaultOptions';

const mdToHtml = (
  markdownContent: string,
  options: * = defaultOptions,
): string =>
  remark()
    .use(remarkGridTables)
    .use(() => markdownAST =>
      remarkAutolink({ markdownAST }, options.autolinkHeaders),
    )
    .use(() => markdownAST => remarkPrismjs({ markdownAST }, options.prismjs))
    .use(remarkHtml)
    .processSync(markdownContent).contents;

export default mdToHtml;
