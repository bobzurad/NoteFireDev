define(
  ['jquery', 'underscore', 'backbone', 'models/note', 'models/constants',
   'text!templates/editNote.html'],
  function($, _, Backbone, NoteModel, Constants, editNoteTemplate) {
    'use strict';

    var EditNoteView = Backbone.View.extend({
      el: '#viewContainer',

      template: _.template(editNoteTemplate),

      events: {
        "click #saveNote": 'saveNote',
        "click #deleteNote": 'showDeleteWarning',
        "click #noDelete": 'hideDeleteWarning',
        "click #yesDelete": 'deleteNote'
      },

      //this runs on page load
      initialize: function() {
        var self = this;
        //this view needs access to the router
        require(['routers/router'], function(Router) { self.router = Router; });
      },

      render: function(id) {
        var NoteRef = Backbone.Firebase.Model.extend({
          validate: new NoteModel().validate, //copy the validation function from NoteModel
          url: Constants.FirebaseUrl + "notes/" + id,
          autoSync: false //so we can delay syncing until we've verified model is valid
        });

        this.model = new NoteRef();
        this.model.fetch();

        if (this.model.attributes.dateCreated === undefined) {
          //note isn't synced yet
          this.listenTo(this.model, 'sync', this.modelLoaded);
        } else {
          this.modelLoaded(this.model);
        }

        this.listenTo(this.model, 'invalid', this.showErrors);

        return this;
      },

      modelLoaded: function(model) {
        this.$el.html(this.template({ model: this.model.attributes }));
        this.$el.find("#content").focus();
        window.scrollTo(0,0);
      },

      saveNote: function(e) {
        //set values on the model
        this.model.set({
          title: this.$el.find("#title").val(),
          content: this.$el.find("#content").val(),
        });

        this.clearErrors();

        //perform validation and save
        if (this.model.isValid()) {
          this.model.save();
          this.router.navigate("#/", { trigger: true });
        }
      },

      deleteNote: function(e) {
        this.model.destroy();
        this.model.fetch();
        this.router.navigate("#/", { trigger: true });
      },

      showErrors: function(model, errors) {
        _.each(errors, function(error) {
          this.$el.find("#" + error.attr).parent().addClass('has-danger');
          this.$el.find("#" + error.attr).parent().find('.form-control-label').text(error.msg);
        }, this);
      },

      clearErrors: function() {
        this.$el.find(".has-danger").removeClass("has-danger");
        this.$el.find(".form-control-label").text("");
      },

      showDeleteWarning: function(e) {
        this.$el.find('.buttonGroup').hide();
        this.$el.find('.deleteWarning').show();
      },

      hideDeleteWarning: function(e) {
        this.$el.find('.buttonGroup').show();
        this.$el.find('.deleteWarning').hide();
      }
    });

    return EditNoteView;
  }
);
