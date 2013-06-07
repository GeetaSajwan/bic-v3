/*global chai:true, describe:true, it:true, before: true, beforeEach:true, after:true, afterEach:true, expect:true, should:true, sinon:true */
define('wrapper-backbone', ['backbone'], function (Backbone) {
  "use strict";
  Backbone.sync = function () {};
  return Backbone;
});

define('BlinkForms', [], function () {
  "use strict";
  return {};
});

define('model-form-mobile', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Model.extend();
});

define('data-pouch', [], function () {
  "use strict";
  return sinon.spy();
});

window.BMP = {
  siteVars: {
    answerSpace: 'Exists',
    answerSpaceId: 1
  }
};

define(['../../scripts/collection-forms-mobile.js'],
  function (Collection) {
    "use strict";
    var collection;

    describe('Collection - Forms', function () {
      it("should exist", function () {
        should.exist(Collection);
      });

      describe('initialize()', function () {
        it("should trigger an initialization event when initialized", function (done) {
          collection = new Collection();
          collection.once('initialize', done());
        });

        it("should set up it's data object", function () {
          collection.should.have.property('data');
        });

        it("should have populated itself from the data store", function (done) {
          require(['data-pouch'], function (Data) {
            should.equal(Data.called, true);
            done();
          });
        });

        it("should have created BlinkForms.getDefinition", function (done) {
          require(['BlinkForms'], function (forms) {
            forms.should.have.property('getDefinition');
            done();
          });
        });
      });
    });

    describe('BlinkForms.getDefinition(name, action)', function () {
      it("should create a valid form definition");
    });
  });