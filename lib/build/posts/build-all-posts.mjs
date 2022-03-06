import readdirp from 'readdirp';
import { POSTS_DIR } from '../../constants';
import buildPost, { getPostData } from './build-post';

export async function getAllPostData(postsDir = POSTS_DIR) {
  const postData = [];

  for await (const entry of readdirp(postsDir, {
    fileFilter: ['**/*.md'],
  })) {
    postData.push(await getPostData(entry.path));
  }

  return postData;
}

export default async function buildAllPosts(postsDir = POSTS_DIR) {
  for await (const entry of readdirp(postsDir, {
    fileFilter: ['**/*.md'],
  })) {
    await buildPost(entry.path);
  }

  console.log('[build-all-posts]', `Success`);
}
