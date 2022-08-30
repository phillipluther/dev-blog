import React from 'react';
import classnames from 'classnames';
import * as styles from './display-font.module.css';

export type DisplayFontProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
};

const DisplayFont = ({
  as: Tag = 'p',
  children,
  className,
  ...props
}: DisplayFontProps) => (
  <Tag className={classnames(styles.text, className)} {...props}>
    {children}
  </Tag>
);

export default DisplayFont;
