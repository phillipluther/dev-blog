import buildScript from './build-script';
import buildAllScripts from './build-all-scripts';
import isCli from '../../is-cli';

export { buildScript, buildAllScripts };

if (isCli('scripts')) {
  buildAllScripts();
}
