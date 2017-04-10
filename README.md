# Wowchakra Enhacer
<p>Wowchakra Enhacer is a tool created to quickly adapt wowchakra.com to mobile devices.</p>
<p>Injecting <code>&lt;script src="https://lordfido.github.io/wowchakra-enhacer/wowchakra-enhacer.js"&gt;&lt;/script&gt;</code>
at the end of the <code>&lt;head&gt;</code> tag is enough for Wowchakra Enhacer to start working.</p>

# Init
<p>To initiate Wowchakra Enhacer simply create a new MVG object:</p>
<code>var wowchakraEnhacer = new Enhacer();</code>

# Available Tasks
<p><code>Enhacer</code> is a constructor that has a few tasks built in.</p>
<ul>
  <li><b>wowchakraEnhacer.setViewPort()</b> (function): Generate a <code>&lt;meta&gt;</code> tag to setup the viewport.</li>
  <li><b>wowchakraEnhacer.loadMobileCSS()</b> (function): Inject a <code>&lt;link&gt;</code> with <code>mobileVersion.css</code>.</li>
  <li><b>wowchakraEnhacer.loadSidebarToggle()</b> (function): Creates a button to open/close sidebar on mobile devices.</li>
  <li><b>wowchakraEnhacer.loadSwipeListeners()</b> (function): Start listening to 'Swipe' gestures, to open/close sidebar on mobile devices.</li>
  <li><b>wowchakraEnhacer.loadMobileTutorial()</b> (function): Create some HTML tags to display a short tutorial about how to use mobile version sidebar.</li>
</ul>

# Other Tools
<ul>
  <li><b>debug</b> (boolean): Defines if we are on debug mode or not.</li>
  <li><b>cookieName</b> (string): Defines The name for the cookie that's tells MVG if it should show Mobile Tutorial.</li>
</ul>
<ul>
  <li><b>log()</b> (function, accepts <code>param</code>): If debug mode is active, prints a <code>console.log(param)</code>.</li>
  <li><b>URLs</b> (object): A collection with needed URLs to work. If debug mode is active, use github's URLs. If not, use relative URLs (local).</li>
  <li><b>hasReadTheTutorial()</b> (function): Return <code>true|false</code>.</li>
  <li><b>isMobileDevice()</b> (function): Return <code>true|false</code>.</li>
</ul>
