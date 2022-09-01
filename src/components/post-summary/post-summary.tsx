import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import classnames from 'classnames';
import DisplayFont from '../display-font';
import { PostType } from '../../global-types';
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

  return (
    <TextBlock as="article" className={classnames(styles.wrapper, className)}>
      <header className={styles.header}>
        <DisplayFont as={headingLevel} size="md" className={styles.title}>
          <Link to={slug}>{title}</Link>
        </DisplayFont>
        <p className={styles.date}>{published}</p>
        <Link to={slug} tabIndex={-1} className={styles.image}>
          {coverImage && <GatsbyImage image={coverImage} alt="" aria-hidden />}
        </Link>
      </header>

      <section>
        <p>{summary}</p>
      </section>

      <footer className={styles.footer}>
        <Link to={slug}>
          Read More
          <VisuallyHidden elementType="span">: {title}</VisuallyHidden>
        </Link>
      </footer>
    </TextBlock>
  );
};

export default PostSummary;
