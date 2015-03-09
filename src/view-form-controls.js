define(
  ['text!template-form-controls.mustache', 'model-application'],
  function (Template, app) {
    'use strict';
    var FormControlView = Backbone.View.extend({

      events: {
        'click #FormControls #submit': 'formSubmit',
        'click #FormControls #close': 'formClose',
        'click #nextFormPage': 'nextFormPage',
        'click #previousFormPage': 'previousFormPage'
      },

      render: function () {
        var view, options;

        view = this;
        options = {};


        if (BlinkForms.current.get('pages').length > 1) {
          options.pages = {
            current: BlinkForms.current.get('pages').current.index() + 1,
            total: BlinkForms.current.get('pages').length
          };

          if (BlinkForms.current.get('pages').current.index() !== 0) {
            options.pages.previous = true;
          }

          if (BlinkForms.current.get('pages').current.index() !== BlinkForms.current.get('pages').length - 1) {
            options.pages.next = true;
          }
        }

        view.$el.html(Mustache.render(Template, options));
        $.mobile.activePage.trigger('pagecreate');

        return view;
      },

      nextFormPage: function () {
        var view, index;

        view = this;
        index = BlinkForms.current.get('pages').current.index();

        if (index < BlinkForms.current.get('pages').length - 1) {
          BlinkForms.current.get('pages').goto(index + 1);
        }

        view.render();
      },

      previousFormPage: function () {
        var view, index;

        view = this;
        index = BlinkForms.current.get('pages').current.index();

        if (index > 0) {
          BlinkForms.current.get('pages').goto(index - 1);
        }

        view.render();
      },

      formSubmit: function () {
        this.addToQueue('Pending');
      },

      formClose: function () {
        var that = this;
        $('#closePopup').popup({
          afteropen: function (event) {
            $(event.target).on('click', '#save', {view: that}, that.formSave);
            $(event.target).on('click', '#discard', {view: that}, that.formDiscard);
          },
          afterclose: function (event) {
            $(event.target).off('click', '#save');
            $(event.target).off('click', '#discard');
          }
        });
        $('#closePopup').popup('open');
      },

      formSave: function (e) {
        e.data.view.addToQueue('Draft');
        $('#closePopup').one('popupafterclose', function () {
          history.back();
        });
        $('#closePopup').popup('close');
      },

      formDiscard: function () {
        $('#closePopup').one('popupafterclose', function () {
          history.back();
        });
        $('#closePopup').popup('close');
      },

      addToQueue: function (status, supressQueue) {
        var view = this;
        var model;
        supressQueue = supressQueue || false;

        return new Promise(function (resolve, reject) {
          BlinkForms.current.data().then(function (data) {
            var modelAttrs;
            var options = {};

            options.success = function (updatedModel) {
              if (!supressQueue) {
                $(window).one('pagechange', function () {
                  if (!navigator.onLine || model.get('status') === 'Draft') {
                    app.view.pendingQueue();
                  } else {
                    model.once('processed', function () {
                      if (model.get('status') === 'Submitted') {
                        app.view.popup(model.get('result'));
                        model.destroy();
                      } else {
                        app.view.pendingQueue();
                      }
                    });
                    app.pending.processQueue();
                  }
                });

                if (window.BMP.BIC3.history.length === 0) {
                  window.BMP.BIC3.view.home();
                } else {
                  history.back();
                }
              }
              resolve(updatedModel);
            };

            options.error = reject;

            data._action = view.model.get('blinkFormAction');
            modelAttrs = {
              type: 'Form',
              status: status,
              name: view.model.get('blinkFormObjectName'),
              label: view.model.get('displayName'),
              action: view.model.get('blinkFormAction'),
              answerspaceid: app.get('dbid'),
              data: data
            };
            if (view.model.get('args')['args[pid]']) {
              model = app.pending.get(view.model.get('args')['args[pid]']);
              model.save(modelAttrs, options);
            } else {
              model = app.pending.create(modelAttrs, options);
            }
          });
        });
      }
    });

    return FormControlView;
  }
);