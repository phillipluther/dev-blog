import React from 'react';
import classnames from 'classnames';

import * as styles from './display-font.module.css';

export type DisplayFontProps = {
  as?: keyof JSX.IntrinsicElements;
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
};

const DisplayFont = ({
  as: Tag = 'p',
  size = 'base',
  children,
  className,
  ...props
}: DisplayFontProps) => (
  <Tag className={classnames(styles.text, styles[size], className)} {...props}>
    {children}
  </Tag>
);

export default DisplayFont;
