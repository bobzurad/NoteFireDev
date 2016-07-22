define(
  ['jquery', 'backbone', 'collections/notes', 'views/home', 'views/newNote', 'views/editNote'],
  function($, Backbone, NotesCollection, HomeView, NewNoteView, EditNoteView) {
    'use strict';

    var Router = Backbone.Router.extend({

      routes: {
        "home": "defaultRoute",
        "new": "newRoute",
        "edit/:id": "editRoute",
        "*path": "defaultRoute"
      },

      initialize: function() {
        //this function runs on every page load
        this.HomeView = new HomeView({ collection: NotesCollection });
        this.NewNoteView = new NewNoteView();
        this.EditNoteView = new EditNoteView();
      },

      defaultRoute: function() {
        this.HomeView.render();
      },

      newRoute: function() {
        this.NewNoteView.render();
      },

      editRoute: function(id) {
        this.EditNoteView.render(id);
      }

    });

    return new Router();
  }
);
