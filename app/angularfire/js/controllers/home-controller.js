angular
  .module('NoteFire')
  .controller('HomeController', [
    '$location', 'NoteService',
    function($location, NoteService) {
      'use strict';

      var controller = this;

      controller.notes = NoteService.getNotes();

      controller.onCardClick = function(id) {
        $location.url('edit/' + id);
      };
    }
  ]);
