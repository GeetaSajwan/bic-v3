window.Modernizr = {
  indexeddb: true
};

require.config({
  paths: {
    jquery: '/bower_components/jquery/jquery',
    underscore: '/bower_components/underscore/underscore',
    backbone: '/bower_components/backbone/backbone',
    feature: '/bower_components/amd-feature/feature',
    domReady: '/bower_components/requirejs-domready/domReady',
    text: '/bower_components/requirejs-text/text',
    'BMP.Blobs': '//d1c6dfkb81l78v.cloudfront.net/blink/blobs/1377493706402/bmp-blobs.min',
    BlinkForms: '//d1c6dfkb81l78v.cloudfront.net/blink/forms/3/3.1.1/forms3jqm.min',
    signaturepad: '//d1c6dfkb81l78v.cloudfront.net/signaturepad/2.3.0/jq.sig.min',
    jquerymobile: '/bower_components/jquery-mobile-bower/js/jquery.mobile-1.3.2',
    moment: '/bower_components/momentjs/min/moment.min',
    picker: '/bower_components/pickadate/lib/picker',
    'picker.date': '/bower_components/pickadate/lib/picker.date',
    'picker.time': '/bower_components/pickadate/lib/picker.time',
    mustache: '/bower_components/mustache/mustache',
    bluebird: '/bower_components/bluebird/js/browser/bluebird',
    pouchdb: '/bower_components/pouchdb/dist/pouchdb-nightly',
    implementations: '/tests/implementations'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'BMP.Blobs': {
      deps: ['underscore', 'jquery'],
      exports: 'BMP'
    }
  },
  baseUrl: '/scripts'
});

require([
    'feature!promises',
    'jquery',
    'underscore',
    'backbone',
    'BMP.Blobs',
    'mustache',
    'BlinkForms',
    'pouchdb',
    'jquerymobile',
  ], function (Promise, $, _, Backbone, BMP, Mustache, BlinkForms, Pouch) {
  window.BlinkForms = BlinkForms;
  window.Mustache = Mustache;
  window.Promise = Promise;
  window.Pouch = Pouch;

  require(['main'], function () {
    console.log('BIC started!');
  });
});
