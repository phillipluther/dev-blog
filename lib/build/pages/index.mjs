import buildPage from './build-page';
import buildAllPages, { pageConfigs } from './build-all-pages';
import { isCli } from '../utils';

export { buildAllPages, buildPage, pageConfigs };

if (isCli('pages')) {
  buildAllPages();
}
