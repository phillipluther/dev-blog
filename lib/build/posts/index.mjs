import buildAllPosts from './build-all-posts';
import buildPost from './build-post';
import { isCli } from '../utils';

export { buildAllPosts, buildPost };

// accessed directly from package.json's `build:posts` (CLI usage) VS. imported
if (isCli('posts')) {
  buildAllPosts();
}
