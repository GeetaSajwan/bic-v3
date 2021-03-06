define(
  ['./api-web'],
  function (apiWeb) {
    'use strict';
    var API = {
      getAnswerSpaceMap: function (user) {
        return new Promise(function (resolve, reject) {
          var userString = '';
          if (user) {
            userString = '&_username=' + user;
          }
          cordova.offline.retrieveContent(
            function (data) {
              resolve(JSON.parse(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetConfig.php?_asn=' + window.BMP.BIC.siteVars.answerSpace.toLowerCase() + userString
            }
          );
        });
      },

      getInteractionResult: function (iact, args, options) {
        var getargs = '';
        if (args && typeof args === 'object') {
          _.each(args, function (value, key) {
            if (value) {
              getargs += '&' + key + '=' + value;
            }
          });
        }
        return $.ajax('/_R_/common/3/xhr/GetAnswer.php?asn=' + window.BMP.BIC.siteVars.answerSpace.toLowerCase() + '&iact=' + iact + '&ajax=false' + getargs, options);
      },

      getForm: function () {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            function (data) {
              resolve(JSON.parse(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetForm.php?_v=3&_aid=' + window.BMP.BIC.siteVars.answerSpaceId
            }
          );
        });
      },

      getDataSuitcase: function (suitcase) {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            resolve,
            reject,
            {
              url: apiWeb.GET_MOJO + '?_id=' + window.BMP.BIC.siteVars.answerSpaceId + '&_m=' + suitcase
            }
          );
        });
      },

      setPendingItem: apiWeb.setPendingItem,

      getLoginStatus: function () {
        return $.ajax('/_R_/common/3/xhr/GetLogin.php');
      },

      getFormList: function (formName) {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            function (data) {
              resolve($.parseXML(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetFormList.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formName
            }
          );
        });
      },

      getFormRecord: function (formName, formAction, recordID) {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            function (data) {
              resolve($.parseXML(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetFormRecord.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formName + '&_tid=' + recordID + '&action=' + formAction
            }
          );
        });
      }
    };

    return API;
  }
);
