define(
  ['wrapper-backbone', 'model-datasuitcase-mobile', 'feature!data'],
  function (Backbone, DataSuitcase, Data) {
    "use strict";
    var DataSuitcaseCollection = Backbone.Collection.extend({
      model: DataSuitcase,

      initialize: function () {
        var collection = this;
        collection.initalize = new $.Deferred();
        collection.data = new Data(window.BMP.siteVars.answerSpace + '-DataSuitcase');
        collection.fetch({
          success: function () {
            collection.initalize.resolve();
          },
          error: function () {
            collection.initalize.reject();
          }
        });
      }
    });
    return DataSuitcaseCollection;
  }
);