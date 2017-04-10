/******************************************************/
/** WowChakra enhacer **********************************/
/** Author: ImperdibleSoft ****************************/
/** Website: http://www.imperdiblesoft.com ************/
/******************************************************/
/*
  INLINE SCRIPT
  <script
    src="http://lordfido.github.io/wowchakra-enhacer/wowchakra-enhacer.js"
    id="wowchakra-enhacer"
  ></script>

  DYNAMIC SCRIPT
  var wowchakraEnhacer = document.createElement("script");
  wowchakraEnhacer.id = 'wowchakra-enhacer';  
  wowchakraEnhacer.src = "http://lordfido.github.io/wowchakra-enhacer/wowchakra-enhacer.js";
  document.head.appendChild(wowchakraEnhacer);
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
  var galleryAspectRatio = 0.43;
  var ENHACER_CLASSNAME = 'WowchakraEnhacer';

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

  // Enable/disabled enhaced version
  var toggleEnhacements = function() {
    var classes = document.body.classList;

    if (classes.indexOf(ENHACER_CLASSNAME) >= 0) {
      classes.remove(ENHACER_CLASSNAME);
    } else {
      classes.add(ENHACER_CLASSNAME);
    }
  }

  // Tutorial constructor
  var Enhacer = function() {
    var that = this;

    // Point where everything is gonna be mount
    var URLs = {
      styles: debug
        ? 'https://lordfido.github.io/wowchakra-enhacer/styles/wowchakra-enhacer.css'
        : 'styles/wowchakra-enhacer.css',
      enhacer: debug
        ? 'https://lordfido.github.io/wowchakra-enhacer/wowchakra-enhacer.js'
        : 'wowchakra-enhacer.js',
      repo: 'https://www.github.com/lordfido/wowchakra-enhacer/'
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

      that.loadEventListeners();
    };

    // Do this when press sidebar-toggle
    var touchStart = 0;
    var startTime = 0;
    var touchEnd = 0;
    var allowedTime = 5000;

    // Open sidebar
    var openSidebar = function(sidebarToggle, sidebar) {
      if (!that.isMenuOpen) {
        sidebar.className += ' sidebar-open';
        sidebarToggle.className += ' sidebar-open';
        sidebarToggle.style.right = (sidebar.offsetWidth - 5) + 'px';
      }
    };

    // Close sidebar
    var closeSidebar = function(sidebarToggle, sidebar) {
      sidebar.className = sidebar.className.replace('sidebar-open', '');
      sidebarToggle.className = sidebarToggle.className.replace('sidebar-open', '');
      sidebarToggle.style.right = '0px';
    };

    // Open/Close sidebar
    var handleToggleSidebar = function(e) {
      // Define elements
      var sidebar = document.querySelector('#s5_right_column_wrap');
      var sidebarToggle = document.querySelector('#mvg-sidebar-toggle');

      // If .sidebar-open classname is present, close sidebar
      if (/sidebar\-open/.test(sidebar.className) || e === true) {
        closeSidebar(sidebarToggle, sidebar);

      // If .sidebar-open classname is not present, open sidebar
      } else if (typeof e != "boolean" || e === false) {
        openSidebar(sidebarToggle, sidebar);
      }
    }

    // Saves the initial swipe Point and time
    var handleSwipeStart = function(e) {
      touchStart = e.changedTouches[0].pageX;
      startTime = new Date().getTime();
    }

    // Saves the final swipe point and time
    var handleSwipeEnd = function(e) {
      touchEnd = e.changedTouches[0].pageX;

      // Calc swiped distance
      var distance = touchEnd - touchStart;

      // Calc elapsed time
      var elapsedTime = new Date().getTime() - startTime;

      // Calc if the application sould open/Close
      if (distance >= 100 && elapsedTime <= allowedTime) {
        var swipeRight = true;
      } else if (distance <= -100 && elapsedTime <= allowedTime) {
        var swipeRight = false;
      }

      if (typeof swipeRight == "boolean") {
        handleToggleSidebar(swipeRight);
      }
    }

    // Update gallery sizes
    var handleResize = function() {
      that.galleryResize();
    }

    // Convert hoverable-navigation into clickable-navigation
    var handleNavigationClick = function(e) {
      if (isMobileDevice()) {

        // Get parent element
        var parent = e.target.offsetParent;
        var linkWrapper = e.target.parentElement.parentElement;

        // If it's a subMenusContainer
        if (/s5_sub_wrap/.test(parent.classList)) {

          // Mark current menu as hidden
          parent.className += ' is-hidden';
        }

        // If this menu opens another menu
        if (/mainParentBtn/.test(parent.classList) || /subParentBtn/.test(linkWrapper.classList)) {
          that.isMenuOpen = true;
          e.preventDefault();
        } else {
          that.isMenuOpen = false;
        }
      }
    }

    // Add a link to disable enhacements
    this.setEnhacementLink = function() {
      var enhacementLink = document.createElement('a');
      a.href = 'javascript:toggleEnhacements();';
      a.innerText = 'Versión de escritorio';
      a.className = 'WowchakraEnhacer-toggleEnhacements';

      var header = document.querySelector('#s5_header_wrap');
      header.appendChild(enhacementLink);
    }

    // Set viewport meta, needed for mobile devices
    this.setViewPort = function() {
      var viewPort = document.createElement('meta');
      viewPort.name = 'viewport';
      viewPort.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
      viewPort.id = 'mvg-viewport';

      document.head.appendChild(viewPort);
      log('ViewPort has been set.');
    }

    // Add mobileCSS stylesheet
    this.loadNewStyles = function() {
      var enhacedStyles = document.createElement('link');
      enhacedStyles.href = URLs.styles;
      enhacedStyles.rel = 'stylesheet';
      enhacedStyles.type = 'text/css';
      enhacedStyles.id = 'mvg-css';

      document.head.appendChild(enhacedStyles);
      document.body.classList.add(ENHACER_CLASSNAME);
      log('enhacedStyles has been loaded.');
    }

    // Add a button to open/close sidebar
    this.loadSidebarToggle = function() {

      // Create sidebarToggle button
      var sidebarToggle = document.createElement('span');
      sidebarToggle.id = 'mvg-sidebar-toggle';
      sidebarToggle.className = 'sidebar-toggle';

      // Add sidebarToggle to sidebar wrapper
      var sidebar = document.querySelector('#s5_center_area_inner #s5_columns_wrap_inner');
      sidebar.appendChild(sidebarToggle);

      // Detect sidebarToggle click
      sidebarToggle.addEventListener('click', handleToggleSidebar);
      log('sidebarToggle has been loaded.');
    }

    // Add listeners for swipe right/left
    this.loadEventListeners = function() {
      // Detecting touch events (for swipes)
      document.addEventListener('touchstart', handleSwipeStart);
      document.addEventListener('touchend', handleSwipeEnd);

      // Detecting clicks event on menus
      document.querySelector('#s5_menu_wrap').addEventListener('click', handleNavigationClick);
      document.querySelector('#subMenusContainer').addEventListener('click', handleNavigationClick);

      // Detecting resizing (for resizing gallery)
      window.addEventListener('resize', handleResize);
      handleResize();

      log('eventListeners have been loaded.');
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
      explanationText[0].innerText = 'Pulsa este botón (o desliza el dedo hacia el borde izquierdo de la pantalla) para abrir la barra lateral.';

      explanationText[2] = document.createElement('p');
      explanationText[2].innerText = 'Para cerrarla, vuelve a pulsarlo (o desliza el dedo hacia el borde derecho de la pantalla).';

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
      log('mobileTutorial has been loaded.');
    };

    // Resize gallery
    this.galleryResize = function() {
      var gallery = document.querySelector("#myGallery.jdGallery");
      if (gallery) {
        var width = parseInt(gallery.offsetWidth);
        var height = (width * galleryAspectRatio);

        gallery.style.height = height + "px";
        log("Gallery height updated to: " + height);
      }
    }
  }

  // Create new tutorial
  var wowchakraEnhacer = new Enhacer();

  // Instantly set the viewport, and CSS files on <head></head>
  wowchakraEnhacer.setViewPort();
  wowchakraEnhacer.loadNewStyles();

  // Recursive function, wait until <body></body> is available
  var verifyBodyIsMounted = function() {

    // If body is available, so we can mount things on it
    if (
      document.body !== null &&
      typeof document.body !== undefined &&
      document.querySelector('#s5_center_area_inner #s5_columns_wrap_inner') !== null &&
      typeof document.querySelector('#s5_center_area_inner #s5_columns_wrap_inner') !== undefined &&
      document.querySelector('#subMenusContainer') !== null &&
      typeof document.querySelector('#subMenusContainer') !== undefined
    ) {

      // Set sidebarToggle
      wowchakraEnhacer.loadSidebarToggle();
      wowchakraEnhacer.setEnhacementLink();

      // If the user has NOT read the tutorial, mount it
      if (isMobileDevice() && !hasReadTheTutorial()) {
        log('User hasn\'t read the tutorial yet.');
        wowchakraEnhacer.loadMobileTutorial();

      // If the user has read the tutorial, mount listeners
      } else if (isMobileDevice()) {
        wowchakraEnhacer.loadEventListeners();
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
