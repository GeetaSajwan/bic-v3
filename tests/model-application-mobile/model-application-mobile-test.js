/*global chai:true, describe:true, it:true, before: true, beforeEach:true, after:true, afterEach:true, expect:true, should:true, sinon:true */
define('wrapper-backbone', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone;
});

define('model-datasuitcase-mobile', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Model.extend();
});

define('model-form-mobile', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Model.extend();
});

define('collection-datasuitcases-mobile', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Collection.extend();
});

define('collection-forms-mobile', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Collection.extend();
});

define('collection-interactions-mobile', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Collection.extend();
});

define('collection-pending', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Collection.extend();
});

define('collection-stars-mobile', ['backbone'], function (Backbone) {
  "use strict";
  return Backbone.Collection.extend();
});

define('data-pouch', [''], function () {
  "use strict";
  return function () {};
});

define('api-php', ['../../scripts/api-php'], function (API) {
  "use strict";
  var stub = sinon.stub(API);
  return stub;
});

window.BMP = {
  siteVars: {
    answerSpace: 'Exists',
    answerSpaceId: 1
  }
};

define(['../../scripts/model-application-mobile.js', 'backbone'],
  function (Model, Backbone) {
    "use strict";

    describe('Model - Application', function () {
      it("should exist", function () {
        should.exist(Model);
      });

      it("should be an instance of backbone model", function () {
        Model.should.be.an.instanceOf(Backbone.Model);
      });

      describe('initialize()', function () {
        it("should set up it's data store");

        it("should create a collection for interactions");

        it("should create a collection for data suitcases");

        it("should create a collection for forms");

        it("should create a collection for pending items");

        it("should create a collection for stars");

        it("should trigger an 'initialize' event when this + all collections are fully initialized");
      });

      describe('populate()', function () {
        it("should do nothing if offline");

        it("should fetch the answerSpaceMap from API");

        it("should fill the interaction collection from map");

        it("should fill the answerSpace config from map");

        it("should parse interactions for data suitcases");

        it("should parse interactions for form objects");

        it("should trigger an 'initalize' event when complete");

        it("should return a promise");
      });
    });
  });