import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import classnames from 'classnames';
import { FaChevronCircleRight } from 'react-icons/fa';
import { PostType } from '../../global-types';

import DisplayFont from '../display-font';
import TextBlock from '../text-block';

import * as styles from './post-summary.module.css';

export type PostSummaryProps = PostType & {
  image?: IGatsbyImageData;
  summary?: string;
  slug: string;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5';
  className?: string;
};

const PostSummary = ({
  title,
  summary = '',
  published,
  slug,
  image,
  headingLevel = 'h3',
  className,
}: PostSummaryProps) => {
  const coverImage = image ? getImage(image) : null;
  const postPath = `/blog/${slug}`;

  return (
    <TextBlock as="article" className={classnames(styles.wrapper, className)}>
      <header className={styles.header}>
        <DisplayFont as={headingLevel} size="md" className={styles.title}>
          <Link to={postPath}>{title}</Link>
        </DisplayFont>

        <p className={styles.date}>{published}</p>

        <Link to={postPath} tabIndex={-1} className={styles.image}>
          {coverImage && (
            <GatsbyImage
              // className={styles.centerer}
              image={coverImage}
              alt=""
              aria-hidden
            />
          )}
          <VisuallyHidden elementType="span">{title}</VisuallyHidden>
        </Link>
      </header>

      <section>
        <p dangerouslySetInnerHTML={{ __html: summary }} />
      </section>

      <footer className={styles.footer}>
        <Link to={postPath} className={styles.readMore}>
          <DisplayFont as="span">Read More</DisplayFont>
          <FaChevronCircleRight className={styles.icon} />
          <VisuallyHidden elementType="span">: {title}</VisuallyHidden>
        </Link>
      </footer>
    </TextBlock>
  );
};

export default PostSummary;
