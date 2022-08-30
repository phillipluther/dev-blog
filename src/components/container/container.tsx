import React from 'react';
import classnames from 'classnames';
import * as styles from './container.module.css';

export type ContainerProps = {
  as?: keyof JSX.IntrinsicElements;
  noX?: boolean;
  noY?: boolean;
  noTop?: boolean;
  noRight?: boolean;
  noBottom?: boolean;
  noLeft?: boolean;
  centered?: boolean;
  padless?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Container = ({
  as: Tag = 'div',
  noX = false,
  noY = false,
  noTop = false,
  noRight = false,
  noBottom = false,
  noLeft = false,
  padless = false,
  centered = true,
  children,
  className,
  ...props
}: ContainerProps) => {
  const paddingClasses: string[] = [];

  if (!padless) {
    if (!noY) {
      if (!noTop) {
        paddingClasses.push(styles.padTop);
      }

      if (!noBottom) {
        paddingClasses.push(styles.padBottom);
      }
    }

    if (!noX) {
      if (!noLeft) {
        paddingClasses.push(styles.padLeft);
      }

      if (!noRight) {
        paddingClasses.push(styles.padRight);
      }
    }
  }

  return (
    <Tag
      className={classnames(
        {
          [styles.centered]: centered,
        },
        paddingClasses,
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Container;
