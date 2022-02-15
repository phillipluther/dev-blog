import path from 'path';
import readdirp from 'readdirp';
import { POSTS_DIR } from './utils/constants.mjs';
import clean from './utils/clean.mjs';
import processMarkdown from './utils/process-markdown.mjs';

clean();

for await (const entry of readdirp(POSTS_DIR)) {
  if (/\.md$/.test(entry.path)) {
    processMarkdown(path.join(POSTS_DIR, entry.path));
  } else {
    console.warn(`Warning: Ignoring unknown file type ${entry.path}`);
  }
}
