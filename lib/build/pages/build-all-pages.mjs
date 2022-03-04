import path from 'path';
import buildPage from './build-page';
import { TEMPLATES_DIR } from '../../constants';

// manual/explicit building of each page is simpler than the
// if-this-not-if-that-filter-this-include-that logic that'd go into parsing the
// pages directory
//
// there aren't _that_ many pages in the blog; revisit this if it turns out we
// need this to be more automagic
export const pageConfigs = [
  {
    name: '',
    src: path.join(TEMPLATES_DIR, 'home.njk'),
  },
  {
    name: 'contact',
    src: path.join(TEMPLATES_DIR, 'contact.njk'),
  },
];

export default function buildAllPages() {
  return Promise.all(pageConfigs.map(({ name, src }) => buildPage(src, name))).then(() => {
    console.log('[build-all-posts]', `Success`);
  });
}
