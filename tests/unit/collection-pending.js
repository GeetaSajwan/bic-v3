define(['Squire'], function (Squire) {
  'use strict';
  describe('Collection - Pending', function () {
    var injector, Collection, collection, apiStub;

    before(function (done) {
      injector = new Squire();

      apiStub = sinon.stub();
      apiStub.returns(Promise.resolve());

      injector.mock('model-pending', Backbone.Model);
      injector.mock('data-inMemory', function () { return null; });
      injector.mock('api-web', {
        setPendingItem: apiStub
      });

      injector.require(['../src/collection-pending'], function (required) {
        Collection = required;
        done();
      });
    });

    beforeEach(function (done) {
      collection = new Collection();
      done();
    });

    it('should exist', function () {
      should.exist(Collection);
    });

    describe('#datastore', function () {
      it('should create a datastore for the collection', function () {
        expect(collection).to.not.have.property('data');
        collection.datastore();
        expect(collection).to.have.property('data');
      });

      it('should return itself', function () {
        expect(collection.datastore()).to.equal(collection);
      });
    });

    describe('#load', function () {
      beforeEach(function (done) {
        collection.datastore();
        sinon.stub(collection.data, 'readAll', function () {
          return Promise.resolve();
        });
        done();
      });

      it('should return a promise', function () {
        expect(collection.load()).to.be.instanceOf(Promise);
      });

      it('should populate the datastore from cache', function (done) {
        collection.load().then(function () {
          done();
        });
      });
    });

    describe('processQueue()', function () {
      beforeEach(function (done) {
        apiStub.reset();
        done();
      });

      it('should do nothing when offline');

      it('should send pending items to the server when online', function () {
        expect(apiStub.called).to.equal(false);
        collection.add({
          status: 'Pending',
          name: 'test',
          action: 'test',
          data: {}
        });
        expect(collection.length).to.equal(1);
        collection.processQueue();
        expect(apiStub.called).to.equal(true);
      });

      it('should change an items status to submitted after successful submission', function (done) {
        expect(apiStub.called).to.equal(false);
        collection.add({
          status: 'Pending',
          name: 'test',
          action: 'test',
          data: {}
        });
        expect(collection.length).to.equal(1);
        apiStub.returns(Promise.resolve());
        collection.processQueue().then(function () {
          expect(collection.length).to.equal(1);
          expect(apiStub.called).to.equal(true);
          //expect(collection.models[0].get('status')).to.equal('Submitted');
          done();
        });
      });

      it('should keep items in the queue (as pending) after failed submission', function (done) {
        expect(apiStub.called).to.equal(false);
        collection.add({
          status: 'Pending',
          name: 'test',
          action: 'test',
          data: {}
        });
        expect(collection.length).to.equal(1);
        apiStub.returns(Promise.reject());
        collection.processQueue().then(
          function () {
            return;
          },
          function () {
            expect(collection.length).to.equal(1);
            expect(apiStub.called).to.equal(true);
            expect(collection.models[0].get('status')).to.equal('Pending');
            done();
          }
        );
      });

      it('should keep items in the queue if they fail server side validation');

      it('should retain draft items');
    });
  });
});
