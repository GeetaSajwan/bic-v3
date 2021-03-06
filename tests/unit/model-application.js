define(['Squire', 'BlinkGap'], function (Squire) {
  'use strict';

  describe('Model - Application', function () {
    var injector, model, siteMap, loginStatus;
    var oldIsHere = BMP.BlinkGap.isHere; // fix for PhantomJS

    before(function (done) {
      var CollectionMock = Backbone.Collection.extend({
        model: Backbone.Model.extend({
          idAttribute: '_id',
          populate: function () {
            return Promise.resolve();
          }
        }),
        datastore: function () {
          return this;
        },
        load: function () {
          return Promise.resolve();
        },
        save: function () {
          return Promise.resolve();
        }
      });
      var FormsCollectionMock = CollectionMock.extend({
        whenUpdated: function () {
          return Promise.resolve();
        },
        download: function () {
          return Promise.resolve();
        }
      });

      BMP.BlinkGap.isHere = function () { return true; }; // fix for PhantomJS

      siteMap = {};
      loginStatus = {};
      injector = new Squire();

      injector.mock('collection-interactions', CollectionMock);
      injector.mock('collection-datasuitcases', CollectionMock);
      injector.mock('collection-forms', FormsCollectionMock);
      injector.mock('collection-pending', CollectionMock);
      injector.mock('collection-stars', CollectionMock);
      injector.mock('collection-form-records', CollectionMock);
      injector.mock('domReady', function () { return null; });

      injector.mock('api-web', {
        getAnswerSpaceMap: function () { return Promise.resolve(siteMap); },
        getLoginStatus: function () { return Promise.resolve(loginStatus); }
      });

      /*eslint-disable no-console*/ // just for testing
      injector.mock('facade', {
        publish: function () { console.log('#publish'); },
        subscribe: function () { console.log('#subscribe'); }
      });
      /*eslint-enable no-console*/

      injector.require(['../src/model-application.js'], function (required) {
        model = required;
        done();
      });
    });


    it('should exist', function () {
      should.exist(model);
    });

    it('should be an instance of backbone model', function () {
      model.should.be.an.instanceOf(Backbone.Model);
    });

    it('should have an id property', function () {
      expect(model).to.have.property('id');
    });

    it('should have a loginStatus attribute', function () {
      expect(model.attributes).to.have.property('loginStatus');
    });

    describe('#datastore', function () {
      afterEach(function (done) {
        if (model.data) {
          delete model.data;
        }
        done();
      });

      it('should return itself', function () {
        expect(model.datastore()).to.be.equal(model);
      });

      it('should set up a data store', function () {
        model.datastore();
        expect(model).to.have.property('data');
      });
    });

    describe('#collections', function () {
      beforeEach(function () {
        model.datastore();
      });

      afterEach(function (done) {
        delete model.data;
        delete model.interactions;
        delete model.datasuitcases;
        delete model.forms;
        delete model.pending;
        delete model.stars;
        delete model.formRecords;
        delete model.collections._promise;
        done();
      });

      it('should return a promise', function () {
        expect(model.collections()).to.be.instanceOf(Promise);
      });

      it('should create a collection for interactions', function (done) {
        model.collections().then(function () {
          expect(model).to.have.property('interactions');
          expect(model.interactions).to.be.an.instanceOf(Backbone.Collection);
          done();
        });
      });

      it('should create a collection for data suitcases', function (done) {
        model.collections().then(function () {
          expect(model).to.have.property('datasuitcases');
          expect(model.datasuitcases).to.be.an.instanceOf(Backbone.Collection);
          done();
        });
        model.collections();
      });

      it('should create a collection for forms', function (done) {
        model.collections().then(function () {
          expect(model).to.have.property('forms');
          expect(model.forms).to.be.an.instanceOf(Backbone.Collection);
          done();
        });
        model.collections();
      });

      it('should create a collection for pending items', function (done) {
        model.collections().then(function () {
          if (model.hasStorage()) {
            expect(model).to.have.property('pending');
            expect(model.pending).to.be.an.instanceOf(Backbone.Collection);
          } else {
            expect(model).to.not.have.property('pending');
          }
          done();
        });
      });

      it('should create a collection for stars', function (done) {
        model.collections().then(function () {
          expect(model).to.have.property('stars');
          expect(model.stars).to.be.an.instanceOf(Backbone.Collection);
          done();
        });
        model.collections();
      });

      it('should create a collection for form records', function (done) {
        model.collections().then(function () {
          expect(model).to.have.property('formRecords');
          expect(model.formRecords).to.be.an.instanceOf(Backbone.Collection);
          done();
        });
        model.collections();
      });

      it('should resolve when the collections are all ready', function (done) {
        model.collections().then(function () {
          done();
        });
      });
    });

    describe('#setup', function () {
      before(function (done) {
        model.datastore();
        sinon.stub(model.data, 'read', function () {
          return Promise.resolve();
        });
        done();
      });

      after(function (done) {
        model.data.read.restore();
        done();
      });

      it('should return a promise', function () {
        expect(model.setup()).to.be.instanceOf(Promise);
      });


      it('should read from it\'s data store', function (done) {
        model.setup().then(function () {
          done();
        });
      });
    });

    describe('#populate', function () {
      before(function (done) {
        model.collections().then(function () {
          done();
        });
      });

      beforeEach(function (done) {
        siteMap = {};
        done();
      });

      it('should do nothing if offline');

      it('should fetch the answerSpaceMap from API');//, function (done) {
        //model.populate().then(function () {
          //done();
        //});
      //});

      it('should fill the interaction collection from map', function (done) {
        siteMap = JSON.parse('{"map":{"interactions":[1]},"i1":{"pertinent":{"name":"one"}}}');
        model.populate().then(function () {
          expect(model.interactions.length).to.equal(1);
          done();
        }, done);
      });

      it('should fill the answerSpace config from map', function (done) {
        siteMap = JSON.parse('{"a1":{"pertinent":{"cat":"hat"}}}');
        model.populate().then(function () {
          expect(model.get('cat')).to.equal('hat');
          done();
        }, done);
      });

      it('should parse interactions for data suitcases', function (done) {
        siteMap = JSON.parse('{"map":{"interactions":[1]},"i1":{"pertinent":{"name":"one","xml":"test"}}}');
        model.populate().then(function () {
          expect(model.datasuitcases.length).to.equal(1);
          done();
        }, done);
      });

      it('should delete items from the DB when they are removed from the sitemap', function (done) {
        siteMap = JSON.parse('{"map":{"interactions":[1,2,3]},"i1":{"pertinent":{"name":"one"}},"i2":{"pertinent":{"name":"two"}},"i3":{"pertinent":{"name":"three"}}}');
        model.populate().then(function () {
          expect(model.interactions.length).to.equal(3);
          siteMap = JSON.parse('{"map":{"interactions":[1]},"i1":{"pertinent":{"name":"one"}}}');
          model.populate().then(function () {
            expect(model.interactions.length).to.equal(1);
            done();
          }, done);
        }, done);
      });

      it('should return a promise', function () {
        expect(model.populate()).to.be.instanceOf(Promise);
      });
    });

    describe('#checkLoginStatus', function () {
      before(function (done) {
        model.collections().then(function () {
          done();
        }, done);
      });

      it('should return a promise', function () {
        model.set('loginStatus', 'cats!');
        loginStatus = 'cats!';
        expect(model.checkLoginStatus()).to.be.instanceOf(Promise);
      });

      it('should destroy all the collections if login status differs from the saved state', function (done) {
        siteMap = JSON.parse('{"map":{"interactions":[1]},"i1":{"pertinent":{"name":"one"}}}');
        model.populate().then(function () {
          expect(model.interactions.length).to.equal(1);
          loginStatus = 'hats!';
          siteMap = {};
          model.checkLoginStatus().then(function () {
            expect(model.interactions.length).to.equal(0);
            done();
          }, done);
        }, done);
      });
    });

    describe('#initialRender', function () {
      it('should do things, wonderous things');
    });

    describe('#hasStorage()', function () {
      it('is a function', function () {
        assert.isFunction(model.hasStorage);
      });

      it('returns a Boolean', function () {
        var result = model.hasStorage();
        assert.isBoolean(result);
      });
    });

    after(function () {
      BMP.BlinkGap.isHere = oldIsHere; // fix for PhantomJS
    });
  });
});
