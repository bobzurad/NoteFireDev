angular
  .module('NoteFire')
  .controller('EditNoteController', [
    '$routeParams', '$location', 'NoteService',
    function($routeParams, $location, NoteService) {
      'use strict';

      var controller = this;

      controller.showWarning = false;
      controller.note = NoteService.getNoteById($routeParams.id);

      angular.element("#content").focus();
      window.scrollTo(0,0);

      if (controller.note === null) {
        //note either doesn't exist the array isn't loaded yet.
        NoteService.getNotes().$loaded().then(function(data) {
          controller.note = data.$getRecord($routeParams.id);
        });
      }

      controller.saveNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        NoteService.updateNote(controller.note);
        controller.note = {};
        $location.url('/');
      };

      controller.showDeleteWarning = function() {
        controller.showWarning = true;
      };

      controller.hideDeleteWarning = function() {
        controller.showWarning = false;
      };

      controller.deleteNote = function() {
        NoteService.deleteNote(controller.note);
        controller.note = {};
        $location.url('/');
      };
    }
  ]);
