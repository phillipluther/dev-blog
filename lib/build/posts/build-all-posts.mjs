import readdirp from 'readdirp';
import { POSTS_DIR } from '../../constants';
import buildPost from './build-post';

export default async function buildAllPosts(postsDir = POSTS_DIR) {
  for await (const entry of readdirp(postsDir, {
    fileFilter: ['**/*.md'],
  })) {
    await buildPost(entry.path);
  }

  console.log('[build-all-posts]', `Success!`);
}
