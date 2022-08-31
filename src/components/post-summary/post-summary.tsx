import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImageProps } from 'gatsby-plugin-image';
import DisplayFont from '../display-font';
import { PostType } from '../../global';
import TextBlock from '../text-block';
import * as styles from './post-summary.module.css';

export type PostSummaryProps = PostType & {
  image?: GatsbyImageProps;
  excerpt: string;
  slug: string;
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5';
};

const PostSummary = ({
  title,
  excerpt,
  published,
  slug,
  image,
  headingLevel = 'h3',
}: PostSummaryProps) => {
  return (
    <TextBlock as="article" className={styles.wrapper}>
      <header>
        <DisplayFont as={headingLevel} className={styles.title}>
          <Link to={slug}>{title}</Link>
        </DisplayFont>
        <p className={styles.date}>{published}</p>
      </header>
      <section>
        <p>{excerpt}</p>
      </section>
    </TextBlock>
  );
};

export default PostSummary;
