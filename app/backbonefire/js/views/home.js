define(
  ['jquery', 'underscore', 'backbone', 'text!templates/home.html', 'views/note'],
  function($, _, Backbone, homeTemplate, NoteView) {
    'use strict';

    var HomeView = Backbone.View.extend({
      el: '#viewContainer',

      template: _.template(homeTemplate),

      //this runs on page load
      initialize: function() {
        this.listenTo(this.collection, 'add', this.noteAdded);
        this.listenTo(this.collection, 'remove', this.noteDeleted);
        this.listenTo(this.collection, 'sync', this.collectionSynced);
      },

      render: function() {
        this.$el.html(this.template());

        this.$noteViewsContainer = $("#noteViewsContainer");

        if (this.$noteViewsContainer.children().length === 0 && this.collection.length > 0) {
          //notes are in collection, but removed from DOM. restore them.
          //use case: user is returning to home page from edit or create page
          this.renderNotes();
        }

        window.scrollTo(0,0);

        return this;
      },

      renderNotes: function() {
        var self = this;

        if(this.$noteViewsContainer) {
          this.$noteViewsContainer.empty();

          this.collection.each(function(note) {
            self.renderNote(note);
          });
        }
      },

      renderNote: function(note) {
        if (this.$noteViewsContainer) {
          var view = new NoteView({ model: note });
          this.$noteViewsContainer.prepend(view.render().el);
        }
      },

      noteAdded: function(model, collection) {
        this.renderNote(model);
      },

      noteDeleted: function(model, collection) {
        this.$noteViewsContainer
          .find('#' + model.attributes.id)
          .remove();
      },

      collectionSynced: function() {
        this.renderNotes();
      }

    });

    return HomeView;
  }
);
