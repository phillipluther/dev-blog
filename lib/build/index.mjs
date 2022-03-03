import { buildAllPosts } from './posts';
import { buildAllPages } from './pages';
import buildStatic from './static';
import buildStyles from './styles';

buildAllPosts();
buildAllPages();
buildStatic();
buildStyles(process.env.NODE_ENV === 'production');
