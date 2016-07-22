define(
  ['jquery', 'underscore', 'backbone', 'text!templates/note.html'],
  function($, _, Backbone, noteTemplate) {
    'use strict';

    var NoteView = Backbone.View.extend({

      template: _.template(noteTemplate),

      events: {
        'click .noteCard': 'editNote'
      },

      //this runs on page load
      initialize: function() {
        var self = this;
        //this view needs access to the router
        require(['routers/router'], function(Router) { self.router = Router; });
      },

      render: function() {
        this.$el.html(this.template({ model: this.model.attributes }));

        return this;
      },

      editNote: function() {
        this.router.navigate("#/edit/" + this.model.attributes.id, { trigger: true });
      }
    });

    return NoteView;
  }
);
