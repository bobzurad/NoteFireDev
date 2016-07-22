/*global require*/
(function() {
  'use strict';

  // Require.js config for NoteFire app
  require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
      underscore: { exports: '_' },
      backbone: {
        deps: [ 'underscore','jquery'],
        exports: 'Backbone'
      },
      tether: { exports: 'Tether' },
      bootstrap : { deps: ['jquery'] },
      backbonefire: { deps: ['backbone'] },
    },
    paths: {
      jquery: '../../common/libs/jquery/jquery',
      tether: '../../common/libs/tether/js/tether',
      bootstrap: '../../common/libs/bootstrap/js/bootstrap',
      underscore: '../libs/underscore/underscore',
      backbone: '../libs/backbone/backbone',
      text: '../libs/requirejs/text',
      firebase: '../libs/firebase/firebase-debug',
      backbonefire: '../libs/backbonefire/backbonefire',
    }
  });

  //hack to fix Bootstrap 4 alpha 2 requiring window.Tether
  require(
    ['tether'],
    function(Tether) {
      window.Tether = Tether;
    }
  );

  //main require for NoteFire app
  require(
    ['backbone', 'routers/router', 'bootstrap'],
    function (Backbone, Router) {
      //Initialize and start NoteFire app
      Backbone.history.start();
    }
  );

  /*!
   * IE10 viewport hack for Surface/desktop Windows 8 bug
   * Copyright 2014-2015 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   */
  // See the Getting Started docs for more information:
  // http://getbootstrap.com/getting-started/#support-ie10-width
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    );
    document.head.appendChild(msViewportStyle);
  }
}());
