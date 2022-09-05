import React from 'react';
import classnames from 'classnames';
import * as styles from './divider.module.css';

export type DividerProps = {
  className?: string;
};

const Divider = ({ className, ...props }: DividerProps) => (
  <hr
    className={classnames(styles.divider, className)}
    role="presentation"
    {...props}
  />
);

export default Divider;
