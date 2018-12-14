// @flow

export type IndexingItem = {
  title: string,
  body: string,
  url: string,
};

export type Child = {
  type: 'text' | 'heading',
  value?: string,
  url?: string,
  children?: Array<Child>,
};

export type Ast = {
  children: Array<Child>,
};

export type Tree = {
  type: string,
  children: Array<Tree>,
  position: {
    start: any,
    end: any,
  },
};

// Note: from remark-utils
export type Base64Image = {
  imagePath: string,
  width: number,
  height: number,
  format: string,
  base64: string,
};
export type Base64Mapper = (imagePath: string) => ?Base64Image;

export type Option = {
  autolinkHeaders?: {
    icon: string,
    className: string,
  },
  prismjs?: {
    classPrefix: string,
    inlineCodeMarker: ?string,
    aliases: Object,
    noInlineHighlight: boolean,
  },
  lazysizes?: {
    srcAttr: string,
    base64Mapper?: Base64Mapper,
  },
};
