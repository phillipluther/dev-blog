import path from 'path';
import buildPage from './build-page';
import { TEMPLATES_DIR } from '../../constants';
import { getAllPostData } from '../posts';

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
    data: async () => {
      const posts = await getAllPostData();
      return { posts };
    },
  },
  // {
  //   name: 'posts',
  //   src: path.join(TEMPLATES_DIR, 'posts.njk'),
  //   data: async () => {
  //     const posts = await getAllPostData();
  //     return { posts };
  //   },
  // },
  {
    name: 'contact',
    src: path.join(TEMPLATES_DIR, 'contact.njk'),
  },
];

export default function buildAllPages() {
  return Promise.all(pageConfigs.map(({ name, src, data }) => buildPage(src, name, data))).then(
    () => {
      console.log('[build-all-posts]', `Success`);
    },
  );
}
