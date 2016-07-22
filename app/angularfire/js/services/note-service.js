angular
  .module('NoteFire')
  .service('NoteService', [
    '$firebaseArray', '$firebaseObject', 'Constants',
    function($firebaseArray, $firebaseObject, Constants) {
      'use strict';

      var NoteService = this;

      firebase.initializeApp(Constants.FirebaseConfig);

      var notesRef = firebase.database().ref('notes/');
      var notes = $firebaseArray(notesRef);

      NoteService.getNotes = function() {
        return notes;
      };

      NoteService.addNote = function(note) {
        notes.$add(note);
      };

      NoteService.deleteNote = function(note) {
        notes.$remove(note);
      };

      NoteService.getNoteById = function(id) {
        return notes.$getRecord(id);
      };

      NoteService.updateNote = function(note) {
        notes.$save(note);
      };
    }
  ]);
