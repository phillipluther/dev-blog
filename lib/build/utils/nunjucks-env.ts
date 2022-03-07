import nunjucks from 'nunjucks';
import dayjs from 'dayjs';

const env = nunjucks.configure('src/templates', {
  autoescape: false,
  trimBlocks: true,
  lstripBlocks: true,
  noCache: true,
});

env.addFilter('date', (str) => dayjs(str).format('MMMM D, YYYY'));
env.addFilter('readtime', (wordCount: number) => {
  const wordsPerMinute = 200;

  const minutes: number = Math.floor(wordCount / wordsPerMinute);
  const seconds = (wordCount % wordsPerMinute) / wordsPerMinute;

  return seconds >= 0.5 ? minutes + 1 : minutes;
});

export default nunjucks;
