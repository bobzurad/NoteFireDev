define(
  ['underscore', 'backbone', 'models/note', 'models/constants', 'firebase', 'backbonefire'],
  function(_, Backbone, NoteModel, Constants) {
    'use strict';

    var NotesCollection = Backbone.Firebase.Collection.extend({
      model: NoteModel,

      url: Constants.FirebaseUrl + 'notes'
    });

    return new NotesCollection();
  }
);
