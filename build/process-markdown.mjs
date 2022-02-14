import { unified } from 'unified';
import parse from 'remark-parse';
import rehype from 'remark-rehype';
import frontmatter from 'remark-frontmatter';
import extractFrontmatter from 'remark-extract-frontmatter';
import sanitize from 'rehype-sanitize';
import stringify from 'rehype-stringify';
import yaml from 'yaml';
import { toVFile } from 'to-vfile';
import { reporter } from 'vfile-reporter';

async function processMarkdown() {
  const output = await unified()
    .use(parse)
    .use(frontmatter)
    .use(extractFrontmatter, { yaml: yaml.parse })
    .use(rehype)
    .use(sanitize)
    .use(stringify)
    .process(toVFile.readSync('content/2022-02-13-test-post/test-post.md'));

  console.error(reporter(output));
  console.log('output\r', output);
}

processMarkdown();
