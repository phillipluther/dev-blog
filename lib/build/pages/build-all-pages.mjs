import path from 'path';
import buildPage from './build-page';
import { PAGES_DIR } from '../../constants';

export default function buildAllPages() {
  // manual/explicit building of each page is simpler than the
  // if-this-not-if-that-filter-this-include-that logic that'd go into parsing the
  // pages directory
  //
  // there aren't _that_ many pages in the blog; revisit this if it turns out we
  // need this to be more automagic
  const pages = [
    {
      name: '',
      src: path.join(PAGES_DIR, 'home.njk'),
    },
    {
      name: 'contact',
      src: path.join(PAGES_DIR, 'contact.njk'),
    },
  ];

  return Promise.all(pages.map(({ name, src }) => buildPage(src, name))).then(() => {
    console.log('[build-all-posts]', `Success!`);
  });
}
