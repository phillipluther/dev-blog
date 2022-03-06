import buildAllPosts, { getAllPostData } from './build-all-posts';
import buildPost, { getPostData } from './build-post';
import { isCli } from '../utils';

export { buildAllPosts, buildPost, getAllPostData, getPostData };

// accessed directly from package.json's `build:posts` (CLI usage) VS. imported
if (isCli('posts')) {
  buildAllPosts();
}
