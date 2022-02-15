import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeStringify from 'rehype-stringify';
import rehypeDocument from 'rehype-document';
import rehypeMeta from 'rehype-meta';
import { read, write } from 'to-vfile';
import { reporter } from 'vfile-reporter';
import { matter } from 'vfile-matter';
import { DIST_DIR, SITE_URL } from './constants.mjs';
import { mkdirSync } from 'fs';

export default async function processMarkdown(srcFile, metadata = {}) {
  if (!srcFile) {
    console.error('Error: processMarkdown requires a valid source path');
    return null;
  }

  const vFile = await read(srcFile);
  const fileDetails = path.parse(srcFile);

  vFile.data.meta = {
    origin: SITE_URL,
    pathname: `/${fileDetails.name}/`,
  };

  const output = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => (_, file) => {
      matter(file, {
        strip: true,
      });
    })
    .use(remarkRehype)
    .use(rehypeDocument, {
      css: 'https://test-domain/css/some-global-styles.css',
    })
    .use(rehypeMeta, {
      og: true,
      twitter: true,
      copyright: true,
    })
    .use(rehypeStringify)
    .process(vFile);

  const postDir = path.join(DIST_DIR, fileDetails.name);
  mkdirSync(postDir, {
    recursive: true,
  });

  await write({
    path: path.join(postDir, 'index.html'),
    value: String(output),
  });

  console.error(reporter(output));
}
