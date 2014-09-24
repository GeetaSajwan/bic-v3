define({
  environments: [
    { browserName: 'phantomjs' }
  ],

  tunnel: 'NullTunnel',
  //tunnel: 'BrowserStackTunnel',
  //tunnelOptions: {
    //username: 'benbarclay1',
    //accessKey: 'Jyh5RpySv3bh5VTNr4S3'
  //},
  maxConcurrency: 3,

  useLoader: {
    'host-node': 'requirejs',
    'host-browser': '../../node_modules/requirejs/require.js'
  },

  loader: {
    paths: {
      Squire: 'bower_components/squire/src/Squire',
      backbone: 'bower_components/backbone/backbone',
      underscore: 'bower_components/underscore/underscore',
      jquery: 'bower_components/jquery/jquery',
      feature: 'bower_components/amd-feature/feature',
      bluebird: 'bower_components/bluebird/js/browser/bluebird',
      implementations: 'src/app/implementations',
      sinon: 'node_modules/sinon/lib/sinon'
    },
    shim: {
      'BMP.Blobs': {
        deps: ['underscore', 'jquery'],
        exports: 'BMP'
      },
      'signaturepad': {
        deps: ['jquery'],
        exports: '$'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      modernizr: {
        exports: 'Modernizr'
      },
      underscore: {
        exports: '_'
      }
    }
  },

  suites: [ 'tests/unit/app/collections/interactions' ],
  functionalSuites: [ 'tests/functional/boots' ],
  excludeInstrumentation: /^(?:tests|node_modules|bower_components)\//
});

