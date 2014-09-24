/*global chai:true, describe:true, it:true, before: true, beforeEach:true, after:true, afterEach:true, expect:true, should:true, sinon:true */
/*jslint sloppy: true */
define([
  'intern!bdd',
  'intern/chai!expect',
  'Squire',
  'bluebird',
  'backbone',
  'sinon'
], function (bdd, expect, Squire, Promise, Backbone, sinon) {
  'use strict';
  var describe, it, before, beforeEach;//, after, afterEach;
  describe = bdd.describe;
  it = bdd.it;
  before = bdd.before;
  beforeEach = bdd.beforeEach;
  //after = bdd.after;
  //afterEach = bdd.afterEach;

  describe('Collection - Interactions', function () {
    var injector, Collection, collection;

    before(function () {
      return new Promise(function (resolve) {
        injector = new Squire();

        injector.mock('model-interaction', Backbone.Model);
        injector.mock('data-inMemory', function () { return {}; });

        window.BMP = {
          BIC: {
            siteVars: {
              answerSpace: 'test'
            }
          }
        };

        injector.require(['src/app/collections/interactions'], function (required) {
          Collection = required;
          resolve();
        });
      });
    });

    beforeEach(function () {
      collection = new Collection();
    });

    //it("should exist", function () {
      //expect(Collection).to.exist;
    //});

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
      beforeEach(function () {
        collection.datastore();
        sinon.stub(collection.data, 'readAll', function () {
          return Promise.resolve();
        });
      });

      it("should return a promise", function () {
        expect(collection.load()).to.be.instanceOf(Promise);
      });

      it("should populate the datastore from cache", function () {
        return new Promise(function (resolve, reject) {
          collection.load().then(resolve, reject);
        });
      });
    });

    describe('#save', function () {
      it("should persist any models to the data store");
    });
  });
});
