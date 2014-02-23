define(
  [],
  function () {
    "use strict";

    var Data = function () {
      this.data = {};
    };

    _.extend(Data.prototype, {
      create: function () {
        return new $.Deferred().resolve().promise();
      },

      update: function () {
        return new $.Deferred().resolve().promise();
      },

      read: function () {
        return new $.Deferred().resolve().promise();
      },

      readAll: function () {
        return new $.Deferred().resolve().promise();
      },

      delete: function () {
        return new $.Deferred().resolve().promise();
      }
    });

    return Data;
  }
);
