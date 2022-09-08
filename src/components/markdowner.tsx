import React from 'react';
import remark from 'remark';
import remarkHtml from 'remark-html';

export type MarkdownerProps = {
  markdown: string;
  as?: keyof JSX.IntrinsicElements | React.FC;
  [key: string]: unknown;
};

const Markdowner = ({
  markdown,
  as: Tag = 'div',
  ...props
}: MarkdownerProps) => (
  <Tag
    dangerouslySetInnerHTML={{
      __html: remark().use(remarkHtml).processSync(markdown).toString(),
    }}
    {...props}
  />
);

export default Markdowner;
