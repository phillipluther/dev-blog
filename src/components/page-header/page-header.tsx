import React from 'react';
import classnames from 'classnames';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

import DisplayFont from '../display-font';
import Divider from '../divider';
import TextBlock from '../text-block';
import Markdowner from '../markdowner';

import * as styles from './page-header.module.css';

export type PageHeaderProps = {
  title: React.ReactNode;
  published?: string;
  summary?: string;
  image?: IGatsbyImageData;
  className?: string;
  children?: React.ReactNode;
};

const PageHeader = ({
  title,
  published,
  summary,
  image,
  children,
  className,
  ...props
}: PageHeaderProps) => {
  const coverImage = image ? getImage(image) : null;

  return (
    <TextBlock
      as="header"
      className={classnames(styles.wrapper, className)}
      {...props}
    >
      <DisplayFont as="h1" className={styles.title}>
        {title}
      </DisplayFont>

      {published && <p className={styles.published}>{published}</p>}

      {summary && (
        <Markdowner as="p" markdown={summary} className={styles.summary} />
      )}

      {coverImage && (
        <GatsbyImage
          className={styles.image}
          alt=""
          aria-hidden
          image={coverImage}
        />
      )}

      <Divider />
    </TextBlock>
  );
};

export default PageHeader;
