// @flow
import extractIndexingFromMd from '../extractIndexingFromMd';

it('extractIndexingFromMd', () => {
  expect(
    extractIndexingFromMd(`
# header 1 標頭
1
1-1
1-2
## header 2 標頭
2

### header 3 標頭
3

#### header 4 標頭
4

##### header 5 標頭
5
5-1
###### header 6 標頭
6
6-1
`),
  ).toMatchSnapshot();
});
