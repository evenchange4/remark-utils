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
