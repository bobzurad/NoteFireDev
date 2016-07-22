define(
  ['jquery', 'underscore', 'backbone', 'collections/notes', 'models/note', 'text!templates/newNote.html'],
  function($, _, Backbone, NotesCollection, NoteModel, newNoteTemplate) {
    'use strict';

    var NewNoteView = Backbone.View.extend({
      el: '#viewContainer',

      template: _.template(newNoteTemplate),

      events: {
        "click #createNote": 'createNote'
      },

      //this runs on page load
      initialize: function() {
        var self = this;
        //this view needs access to the router
        require(['routers/router'], function(Router) { self.router = Router; });
      },

      render: function() {
        this.model = new NoteModel();

        this.$el.html(this.template({ model: this.model.attributes }));
        this.$el.find("#title").focus();

        this.listenTo(this.model, 'invalid', this.showErrors);

        return this;
      },

      createNote: function(e) {
        //set values on the model
        this.model.set({
          title: this.$el.find("#title").val(),
          content: this.$el.find("#content").val(),
          dateCreated: Date.now()
        });

        this.clearErrors();

        //perform validation and save
        if (this.model.isValid()) {
          //if the collection contains a model with the same .attributes.id,
          //firebase will update the existing model in the colleciton, rather than add a new model
          NotesCollection.create(this.model.attributes);

          this.router.navigate("#/", { trigger: true });
        }
      },

      showErrors: function(model, errors) {
        _.each(errors, function(error) {
          this.$el.find("#" + error.attr).parent().addClass('has-danger');
          this.$el.find("#" + error.attr).parent().find('.form-control-label').text(error.msg);
        }, this);
      },

      clearErrors: function() {
        this.$(".has-danger").removeClass("has-danger");
        this.$(".form-control-label").text("");
      }
    });

    return NewNoteView;
  }
);
