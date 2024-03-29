import React from 'react';
import classnames from 'classnames';

import * as styles from './logo.module.css';

export type LogoProps = {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  size?: 'sm' | 'md';
};

const Logo = ({ className, size, as: Tag = 'span', ...props }: LogoProps) => (
  <Tag className={classnames(styles.wrapper, styles[size], className)}>
    <span className={styles.topRow}>
      <span className={styles.p}>Phillip</span>
      <span className={styles.l}>Luther's</span>
    </span>
    <span className={styles.fe}>Frontend</span>
    <span className={styles.eng}>Engineering</span>
    <span className={styles.blog}>Blog</span>
  </Tag>
);

export default Logo;
