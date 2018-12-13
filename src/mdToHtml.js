// @flow
import remark from 'remark';
import remarkGridTables from 'remark-grid-tables';
import remarkHtml from 'remark-html';
import remarkPrismjs from 'gatsby-remark-prismjs';
import remarkAutolink from 'gatsby-remark-autolink-headers';
import defaultOptions from './utils/defaultOptions';
import remarkLazysizes from './utils/remark-lazysizes';

const mdToHtml = (markdownContent: string, options: *): string => {
  const { autolinkHeaders, prismjs, lazysizes } = {
    ...defaultOptions,
    ...options,
  };

  return remark()
    .use(remarkGridTables)
    .use(() => markdownAST => remarkAutolink({ markdownAST }, autolinkHeaders))
    .use(() => markdownAST => remarkPrismjs({ markdownAST }, prismjs))
    .use(remarkLazysizes, lazysizes)
    .use(remarkHtml)
    .processSync(markdownContent).contents;
};

export default mdToHtml;
