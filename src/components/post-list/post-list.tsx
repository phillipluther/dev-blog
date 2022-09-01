import React from 'react';
import PostSummary from '../post-summary';
import { PostType } from '../../global-types';
import * as styles from './post-list.module.css';

export type PostListProps = {
  title: string;
  postsData: PostType[];
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5';
};

function PostList({ postsData }: PostListProps) {
  return (
    <section>
      <ul>
        {postsData.map((postData) => {
          return (
            <li key={postData.slug} className={styles.item}>
              <PostSummary {...postData} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default PostList;
