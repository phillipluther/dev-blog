import nunjucks from 'nunjucks';
import dayjs from 'dayjs';

const env = nunjucks.configure('src/pages', {
  autoescape: false,
  trimBlocks: true,
  lstripBlock: true,
  noCache: true,
});

env.addFilter('date', (str) => dayjs(str).format('MMMM D, YYYY'));
env.addFilter('readtime', (wordCount) => {
  const wordsPerMinute = 200;

  const minutes = parseInt(wordCount / wordsPerMinute);
  const seconds = (wordCount % wordsPerMinute) / wordsPerMinute;

  return seconds >= 0.5 ? minutes + 1 : minutes;
});

export default nunjucks;
