import { buildAllPosts } from './posts';
import { buildAllPages } from './pages';
import { buildAllStyles } from './styles';
import { buildAllScripts } from './scripts';
import buildStatic from './static';

const isProduction = process.env.NODE_ENV === 'production';

buildAllPosts();
buildAllPages();
buildAllStyles(isProduction);
buildAllScripts(isProduction);
buildStatic();
