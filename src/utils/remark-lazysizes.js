/* eslint no-param-reassign: 0 */
// @flow
import visit from 'unist-util-visit';
import { type Tree } from './type.flow';

export type Options = {
  base64?: {
    [string]: string,
  },
  srcAttr: string,
};

export default function attacher({ base64, srcAttr }: Options) {
  function visitor(node) {
    const inline = base64 && base64[node.url];

    if (inline) {
      node.data = {
        hProperties: { [srcAttr]: node.url, class: 'lazyload' },
      };
      node.url = inline;
    }
  }

  function transformer(tree: Tree) {
    if (base64) {
      visit(tree, 'image', visitor);
    }
  }

  return transformer;
}
