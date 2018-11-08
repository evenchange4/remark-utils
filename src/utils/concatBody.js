// @flow

import { type Child } from './type.flow';

const concatBody = ({ type, children, value }: Child) => {
  let body = '';
  // Note: leaf
  if (type === 'text' && value) {
    body = `${body}${value}`;
  }
  // Note: recursive children
  if (children) {
    const nestBody = children.map(concatBody).join('');
    body = `${body}${nestBody}`;
  }
  return body;
};

export default concatBody;
