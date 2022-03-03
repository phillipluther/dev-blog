import buildStylesheet from './build-stylesheet';
import buildAllStyles from './build-all-styles';
import isCli from '../../is-cli';

export { buildStylesheet, buildAllStyles };

if (isCli('styles')) {
  buildAllStyles(process.env.NODE_ENV === 'production');
}
