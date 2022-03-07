import { buildAllPosts } from './posts';
import { buildAllPages } from './pages';
import { buildAllStyles } from './styles';
import buildStatic from './static';

buildAllPosts();
buildAllPages();
buildAllStyles(process.env.NODE_ENV === 'production');
buildStatic();
