# Mobile Version Generator
<p>Mobile Version Generator (MVG in advance) is a tool created to quickly adapt wowchakra.com to mobile devices.</p>
<p>Injecting <code>&lt;script src="https://lordfido.github.io/wowchakra-mobile/mobileVersionGenerator.js"&gt;&lt;/script&gt;</code>
at the end of the <code>&lt;head&gt;</code> tag is enough for MVG to start working.</p>

# Init
<p>To initiate MVG simply create a new MVG object:</p>
<code>var generator = new MobileVersionGenerator();</code>

# Available Tasks
<p><code>mobileVersionGenerator</code> is a constructor that has a few tasks built in.</p>
<ul>
  <li><b>generator.setViewPort()</b> (function): Generate a <code>&lt;meta&gt;</code> tag to setup the viewport.</li>
  <li><b>generator.loadMobileCSS()</b> (function): Inject a <code>&lt;link&gt;</code> with <code>mobileVersion.css</code>.</li>
  <li><b>generator.loadSidebarToggle()</b> (function): Creates a button to open/close sidebar on mobile devices.</li>
  <li><b>generator.loadSwipeListeners()</b> (function): Start listening to 'Swipe' gestures, to open/close sidebar on mobile devices.</li>
  <li><b>generator.loadMobileTutorial()</b> (function): Create some HTML tags to display a short tutorial about how to use mobile version sidebar.</li>
  <li><b>generator.loadGoogleAnalitycs()</b> (function): Inject a script that allows Google to track users' behavior.</li>
</ul>

# Other Tools
<ul>
  <li><b>debug</b> (boolean): Defines if we are on debug mode or not.</li>
  <li><b>cookieName</b> (string): Defines The name for the cookie that's tells MVG if it should show Mobile Tutorial.</li>
  <li><b>allowImperdibleSoftGetSomeAnalitycs</b> (boolean): Defines if Google Analitycs is gonna be loaded, so MVG's developer can track users' behavior.</li>
</ul>
<ul>
  <li><b>log()</b> (function, accepts <code>param</code>): If debug mode is active, prints a <code>console.log(param)</code>.</li>
  <li><b>URLs</b> (object): A collection with needed URLs to work. If debug mode is active, use github's URLs. If not, use relative URLs (local).</li>
  <li><b>hasReadTheTutorial()</b> (function): Return <code>true|false</code>.</li>
  <li><b>isMobileDevice()</b> (function): Return <code>true|false</code>.</li>
</ul>
