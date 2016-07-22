angular
  .module('NoteFire')
  .controller('AddNoteController', [
    '$location', 'NoteService',
    function($location, NoteService) {
      'use strict';

      var controller = this;

      controller.note = {};

      angular.element("#title").focus();
      window.scrollTo(0,0);

      controller.addNote = function() {
        if (controller.note.title.indexOf("<script") >= 0 ||
            controller.note.content.indexOf("<script") >= 0) {
          return;
        }

        NoteService.addNote({
          title: controller.note.title,
          content: controller.note.content,
          dateCreated: Date.now()
        });
        controller.note = {};

        $location.url('/');
      };
    }
  ]);
