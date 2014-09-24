define([
  'intern!bdd',
  'intern/dojo/node!leadfoot/helpers/pollUntil'
], function (bdd, pollUntil) {
  'use strict';

  var describe, it;
  describe = bdd.describe;
  it = bdd.it;

  describe('answerSpace Boot', function () {
    it('should successfully boot', function () {
      return this.remote()
        .get('url')
        .then(pollUntil('return window.ready;', 5000));
    });
  });
});
