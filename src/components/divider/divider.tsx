import React from 'react';
import classnames from 'classnames';

import * as styles from './divider.module.css';

export type DividerProps = {
  className?: string;
  fullWidth?: boolean;
};

const Divider = ({ className, fullWidth, ...props }: DividerProps) => (
  <hr
    className={classnames(
      styles.divider,
      { [styles.fullWidth]: fullWidth },
      className,
    )}
    role="presentation"
    {...props}
  />
);

export default Divider;
