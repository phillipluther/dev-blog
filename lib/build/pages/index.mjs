import buildPage from './build-page';
import buildAllPages from './build-all-pages';
import { isCli } from '../utils';

export { buildAllPages, buildPage };

if (isCli('pages')) {
  buildAllPages();
}
