/******************************************************/
/** WowChakra mobile **********************************/
/** Author: ImperdibleSoft ****************************/
/** Website: http://www.imperdiblesoft.com ************/
/******************************************************/
/*
<script src="http://lordfido.github.io/wowchakra-mobile/mobileVersionGenerator.js"></script>
*/

/* This file dynamically creates a very simple tutorial for mobile layout */
(function() {
  var debug = true;
  var log = function(param) {
    if (debug) {
      console.log(param);
    }
  }

  var cookieName = 'hasReadTheTutorial';
  var allowImperdibleSoftGetSomeAnalitycs = true;

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
          log('User has already read the tutorial.');
          hasReadTheTutorial = true;
          break;
        }
      }
    }

    return hasReadTheTutorial;
  };

  // Return true|false depending on user's device
  var isMobileDevice = function() {
    if (
      /android/.test(navigator.userAgent.toLowerCase()) ||
      /iphone/.test(navigator.userAgent.toLowerCase()) ||
      /ipad/.test(navigator.userAgent.toLowerCase()) ||
      /windows phone/.test(navigator.userAgent.toLowerCase())
    ) {
      log('Mobile device detected');
      return true;
    }

    log('No mobile device detected');
    return false;
  }

  // Tutorial constructor
  var MobileVersionGenerator = function() {
    // Point where everything is gonna be mount
    var URLs = {
      mobileCSS: debug ?
        'https://lordfido.github.io/wowchakra-mobile/mobileGenerator/mobileCSS.css' :
        'mobileGenerator/mobileCSS.css',
      analitycs: debug ?
        'https://lordfido.github.io/wowchakra-mobile/mobileGenerator/analitycs.js' :
        'mobileGenerator/analitycs.js'
    };

    // Do this when okBtn has been clicked
    var handleOkBtnClick = function(e) {
      var d = new Date();
      var expDays = 999999;
      d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
      var expires = "expires="+ d.toUTCString();

      // Add a cookie to save this action
      document.cookie = cookieName + '=true; ' + expires;

      // Remove tutorial from screen
      var mobileTutorialLayout = document.querySelector('.Tutorial');
      var mobileTutorialBackdrop = document.querySelector('.Tutorial-backdrop');
      mobileTutorialLayout.remove();
      mobileTutorialBackdrop.remove();
      document.body.style.overflow = 'auto';
      log('Mobile tutorial has been read and dismissed.');
    };

    // Set viewport meta, needed for mobile devices
    this.setViewPort = function() {
      var viewPort = document.createElement('meta');
      viewPort.name = 'viewport';
      viewPort.content = 'width=device-width, initial-scale=1.0, user-scalable=no';

      document.head.appendChild(viewPort);
      log('ViewPort has been set.');
    }

    // Add mobileCSS stylesheet
    this.loadMobileCSS = function() {
      var mobileCSS = document.createElement('link');
      mobileCSS.href = URLs.mobileCSS;
      mobileCSS.rel = 'stylesheet';
      mobileCSS.type = 'text/css';

      document.head.appendChild(mobileCSS);
      log('mobileCSS has been loaded.');
    }

    // Add tutorial layout
    this.loadMobileTutorial = function() {

      // Create the tutorial wrapper
      var mobileTutorialLayout = document.createElement('div');
      mobileTutorialLayout.className = 'Tutorial';

      // Create backdrop
      var mobileTutorialBackdrop = document.createElement('div');
      mobileTutorialBackdrop.className = 'Tutorial-backdrop';

      // Create tutorial title and apends it to the wrapper
      var tutorialTitle = document.createElement('h1');
      tutorialTitle.className = 'Tutorial-title';
      tutorialTitle.innerText = 'Bienvenido a nuestra versión Mobile';
      mobileTutorialLayout.appendChild(tutorialTitle);

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
      mobileTutorialLayout.appendChild(tutorialLegend);

      // Create an 'OK' btn
      var okBtn = document.createElement('button');
      okBtn.className = 'Tutorial-okBtn';
      okBtn.innerText = 'Ok';
      mobileTutorialLayout.appendChild(okBtn);
      // Detect okBtn click
      okBtn.addEventListener('click', handleOkBtnClick);

      // Mount everything on the root element
      document.body.appendChild(mobileTutorialLayout);
      document.body.appendChild(mobileTutorialBackdrop);
      document.body.style.overflow = 'hidden';
      log('mobileTutorial has has been loaded.');
    };

    // Add Google Analitycs
    this.loadGoogleAnalitycs = function() {
      var analitycsScript = document.createElement('script');
      analitycsScript.src = URLs.analitycs;

      document.head.appendChild(analitycsScript);
      log('Google Analitycs have been loaded');
    }
  }

  // Create new tutorial
  var generator = new MobileVersionGenerator();

  // Instantly set the viewport, and CSS files on <head></head>
  generator.setViewPort();
  generator.loadMobileCSS();

  // If webadmin allows it, load google Analitycs
  if (allowImperdibleSoftGetSomeAnalitycs) {
    generator.loadGoogleAnalitycs();
  }

  // Recursive function, wait until <body></body> is available
  var verifyBodyIsMounted = function() {

    // If body is available, so we can mount things on it
    if (document.body !== null && typeof document.body !== undefined) {

      // If the user has NOT read the tutorial, mount it
      if (isMobileDevice() && !hasReadTheTutorial()) {
        log('User hasn\'t read the tutorial yet.');
        generator.loadMobileTutorial();
      }

    // If body is not available
    } else {

      // Ask again in 500ms
      setTimeout(function() {
        verifyBodyIsMounted();
      }, 500);
    }
  };
  verifyBodyIsMounted();
})();
