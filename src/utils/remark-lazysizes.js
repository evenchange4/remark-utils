/* eslint no-param-reassign: 0 */
// @flow
import visit from 'unist-util-visit';
import { type Tree, type Base64Mapper } from './type.flow';

export type Options = {
  base64Mapper?: Base64Mapper,
  srcAttr: string,
};

/**
 *  Note: transform img with lazyload feature:
 *
 *  <div style="width: 100%; padding-bottom: 43%; height: 0; position: relative;">
 *   <img
 *    style="position: absolute; width: 100%;"
 *    src="base64Mapper" alt="AWS_Icons-300x200.png"
 *    title="aws"
 *    data-src="../images/AWS_Icons-300x200.png"
 *    class="lazyload"
 *   >
 *  </div>
 */

export default function attacher({ base64Mapper, srcAttr }: Options) {
  function visitor(node) {
    const base64Image = base64Mapper && base64Mapper(node.url);

    if (base64Image && base64Image.base64) {
      const imageNode = {
        ...node,
        data: {
          hProperties: {
            [srcAttr]: node.url,
            class: 'lazyload',
            style: 'position: absolute; width: 100%;',
          },
        },
        url: base64Image.base64,
      };
      // ref: https://github.com/verlok/lazyload#occupy-vertical-space-and-maintain-ratio
      const ratio = (base64Image.height / base64Image.width) * 100;
      node.type = 'element';
      node.tagName = 'div';
      node.data = {
        hProperties: {
          style: `width: 100%; padding-bottom: ${ratio}%; height: 0; position: relative;`,
        },
      };
      node.children = [imageNode];
    }
  }

  function transformer(tree: Tree) {
    if (base64Mapper) {
      visit(tree, 'image', visitor);
    }
  }

  return transformer;
}
