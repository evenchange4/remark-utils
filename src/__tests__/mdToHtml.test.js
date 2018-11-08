// @flow
import mdToHtml from '../mdToHtml';

it('Heading with anchor', () => {
  expect(
    mdToHtml(`
# header 1 標頭

## header 2 標頭

### header 3 標頭

#### header 4 標頭

##### header 5 標頭

###### header 6 標頭
`),
  ).toMatchSnapshot();
});

it('Link', () => {
  expect(
    mdToHtml(`
[react-component](./react-component)

[連結文字](http://dev.nodeca.com)

[加上標題的連結文字](http://nodeca.github.io/pica/demo/ '標題文字！')

自動轉換連結 https://github.com/nodeca/pica
`),
  ).toMatchSnapshot();
});

it('List', () => {
  expect(
    mdToHtml(`
- 在行開頭使用 \`+\` \`-\` 或是 \`*\` 來建立清單
- 空兩個空白就可以產生子清單
  - 當清單標記使用的字元不同，會強制建立新的清單
    - Ac tristique libero volutpat at
    * Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- 非常簡單！

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

57. foo
58. bar
`),
  ).toMatchSnapshot();
});

it('Image', () => {
  expect(
    mdToHtml(`
![AWS_Icons-300x200.png](../images/AWS_Icons-300x200.png 'aws')

![Alt text][id]
使用參考，可以在稍後的文件中再定義圖片網址

[id]: https://octodex.github.com/images/dojocat.jpg 'The Dojocat'
`),
  ).toMatchSnapshot();
});

it('code', () => {
  expect(
    mdToHtml(`
\`\`\`python
# This program adds two numbers

num1 = 1.5
num2 = 6.3

# Add two numbers
sum = float(num1) + float(num2)

# Display the sum
print('The sum of {0} and {1} is {2}'.format(num1, num2, sum))
\`\`\`
`),
  ).toMatchSnapshot();
});

it('quote', () => {
  expect(
    mdToHtml(`
> Tip
>
> Whenever you get confused by something in JavaScript, [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [javascript.info](http://javascript.info/) are great websites to check. There are also [community support forums](/community/support.html) where you can ask for help.

> 引用區塊也可以是巢狀的喔...
>
> > ...可以多層次的使用...
> >
> > > ...或是用空白隔開
`),
  ).toMatchSnapshot();
});

it('table native', () => {
  expect(
    mdToHtml(`
| 選項   | 描述                                                                      |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |
`),
  ).toMatchSnapshot();
});

it('table extend', () => {
  expect(
    mdToHtml(`
+-------+----------+------+
| Table Headings   | Here |
+-------+----------+------+
| Sub   | Headings | Too  |
+=======+==========+======+
| cell  | column spanning |
+ spans +----------+------+
| rows  | normal   | cell |
+-------+----------+------+
| multi | cells can be    |
| line  | *formatted*     |
|       | **paragraphs**  |
| cells |                 |
| too   |                 |
+-------+-----------------+
`),
  ).toMatchSnapshot();
});

it('font style', () => {
  expect(
    mdToHtml(`
**這是粗體文字**

_這是斜體文字_

~~這是刪除文字~~
`),
  ).toMatchSnapshot();
});
