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
import { DIST_DIR, POSTS_DIR } from './constants.mjs';

export default async function processMarkdown(srcFile) {
  if (!srcFile) {
    console.error('Error: processMarkdown requires a valid source path');
    return null;
  }

  const vFile = await read(srcFile);
  const fileDetails = path.parse(srcFile);

  vFile.data.meta = {
    origin: 'https://test-domain.com',
    pathname: '/hard-coded-output-path/',
  };

  const output = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => (_, file) => {
      matter(file, {
        strip: true,
      });
    })
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeDocument, {
      css: 'https://test-domain/css/some-global-styles.css',
    })
    .use(rehypeMeta, {
      og: true,
      twitter: true,
      copyright: true,
    })
    .use(rehypeStringify, {
      allowDangerousHtml: true,
    })
    .process(vFile);

  await write({
    path: path.join(DIST_DIR, `${fileDetails.name}.html`),
    value: String(output),
  });

  console.error(reporter(output));
}
