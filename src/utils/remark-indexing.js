// @flow
import concatBody from './concatBody';
import { type IndexingItem, type Ast } from './type.flow';

export const remarkIndexing = (ast: Ast): Array<IndexingItem> => {
  const indexingItems: Array<IndexingItem> = [];
  let prevUrl: string = '';
  let prevTitle: string = '';
  let prevBody: string = '';

  ast.children.forEach(({ type, value, children }, index) => {
    // Heading only in first nest
    if (type === 'heading') {
      if (prevBody) {
        indexingItems.push({ url: prevUrl, title: prevTitle, body: prevBody });
      }
      // output if not empty and start a new one
      // $FlowFixMe
      prevUrl = children[0].url; // [0] = Link
      // $FlowFixMe
      prevTitle = children[1].value; // [1] = Text
      prevBody = '';
    }

    // Recursive
    prevBody = `${prevBody} ${concatBody({ type, value, children })}`;

    // Last one
    if (index === ast.children.length - 1) {
      indexingItems.push({ url: prevUrl, title: prevTitle, body: prevBody });
    }
  });

  return indexingItems;
};

export default remarkIndexing;
