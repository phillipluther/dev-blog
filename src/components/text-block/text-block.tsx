import React from 'react';
import classnames from 'classnames';
import * as styles from './text-block.module.css';

export type TextBlockProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  finePrint?: boolean;
  children?: React.ReactNode;
  [key: string]: unknown;
};

const TextBlock = ({
  as: Tag = 'section',
  children,
  finePrint = false,
  className,
  ...props
}: TextBlockProps) => (
  <Tag
    className={classnames(
      styles.wrapper,
      {
        [styles.finePrint]: finePrint,
        [styles.standard]: !finePrint,
      },
      className,
    )}
    {...props}
  >
    {children}
  </Tag>
);

export default TextBlock;
