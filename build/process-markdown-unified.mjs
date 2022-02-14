import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeStringify from 'rehype-stringify';
import rehypeDocument from 'rehype-document';
import rehypeMeta from 'rehype-meta';
import { read } from 'to-vfile';
import { reporter } from 'vfile-reporter';
import { matter } from 'vfile-matter';

const DIST_DIR = path.resolve('dist');

async function processMarkdown() {
  const srcFile = await read('content/2022-02-13-test-post/test-post.md');

  srcFile.data.meta = {
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
    .process(srcFile);

  console.error(reporter(output));

  await rm(DIST_DIR, {
    recursive: true,
  });
  await mkdir(DIST_DIR);
  writeFile(path.join(DIST_DIR, 'written.html'), String(output));
}

processMarkdown();
