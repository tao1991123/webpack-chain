const ChainedMap = require('./ChainedMap');
const ChainedSet = require('./ChainedSet');

module.exports = class extends ChainedMap {
  constructor(parent) {
    super(parent);

    this.allowedHosts = new ChainedSet(this);

    this.extend([
      'bonjour',
      'clientLogLevel',
      'compress',
      'contentBase',
      'disableHostCheck',
      'filename',
      'headers',
      'historyApiFallback',
      'host',
      'hot',
      'hotOnly',
      'https',
      'inline',
      'lazy',
      'noInfo',
      'open',
      'openPage',
      'overlay',
      'pfx',
      'pfxPassphrase',
      'port',
      'proxy',
      'public',
      'publicPath',
      'quiet',
      'setup',
      'socket',
      'staticOptions',
      'stats',
      'useLocalIp',
      'watchContentBase',
      'watchOptions',
    ]);
  }

  toConfig() {
    return this.clean(
      Object.assign(
        {
          allowedHosts: this.allowedHosts.values(),
        },
        this.entries() || {}
      )
    );
  }

  merge(obj, omit = []) {
    if (!omit.includes('allowedHosts') && 'allowedHosts' in obj) {
      this.allowedHosts.merge(obj.allowedHosts);
    }

    return super.merge(obj, ['allowedHosts']);
  }
};
