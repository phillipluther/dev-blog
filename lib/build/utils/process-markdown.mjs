import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkPrism from 'remark-prism';
import rehypeStringify from 'rehype-stringify';
import rehypeSrcset from './rehype-srcset';
import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

export default async function processMarkdown(srcFile) {
  if (!srcFile) {
    console.error('Error: processMarkdown requires a valid source path');
    return null;
  }

  const vFile = await read(srcFile);

  const output = await unified()
    .use(remarkParse)
    .use(remarkPrism)
    .use(remarkFrontmatter)
    .use(remarkUnwrapImages)
    .use(() => (_, file) => {
      matter(file, {
        strip: true,
      });
    })
    .use(remarkRehype)
    .use(rehypeSrcset)
    .use(rehypeStringify)
    .process(vFile);

  return output;
}
