import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { SuggestedPostDataProps } from '../../global-types';
import DisplayFont from '../display-font';
import * as styles from './post-suggestions.module.css';

export type PostSuggestionsProps = {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  posts: SuggestedPostDataProps[];
};

const PostSuggestions = ({
  className,
  as: Tag = 'nav',
  posts = [],
  ...props
}: PostSuggestionsProps) => {
  return (
    <Tag className={classnames(styles.wrapper, className)} {...props}>
      <ul className={styles.list}>
        {posts.map(({ fields: { slug }, frontmatter, next, previous }) => {
          const image = frontmatter.cover ? getImage(frontmatter.cover) : null;

          return (
            <li
              key={slug}
              className={classnames(styles.item, {
                [styles.previous]: previous,
                [styles.next]: next,
              })}
            >
              <Link to={slug} className={styles.link}>
                <DisplayFont as="span">
                  {frontmatter?.title || 'What to read next? Try this one'}
                </DisplayFont>
              </Link>

              <Link to={slug} className={styles.imageWrapper}>
                {image && (
                  <GatsbyImage
                    className={styles.image}
                    image={image}
                    alt=""
                    aria-hidden
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </Tag>
  );
};

export default PostSuggestions;
