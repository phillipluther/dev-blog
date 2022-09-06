import React from 'react';
import classnames from 'classnames';
import { PostType } from '../../global-types';

import PostSummary from '../post-summary';

import * as styles from './post-list.module.css';

export type PostListProps = {
  postsData: PostType[];
  className?: string;
};

function PostList({ postsData, className, ...props }: PostListProps) {
  return (
    <ul className={classnames(styles.wrapper, className)} {...props}>
      {postsData.map((postData) => {
        return (
          <li key={postData.slug} className={styles.item}>
            <PostSummary {...postData} />
          </li>
        );
      })}
    </ul>
  );
}

export default PostList;
