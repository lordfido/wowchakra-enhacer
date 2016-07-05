# Mobile Version Generator
<p>Mobile Version Generator (MVG in advance) is a tool created to quickly adapt wowchakra.com to mobile devices.</p>
<p>Injecting <code>&lt;script src="https://lordfido.github.io/wowchakra-mobile/mobileVersionGenerator.js"&gt;&lt;/script&gt;</code>
at the end of the <code>&lt;body&gt;</code> tag is enough for MVG to start working.</p>

# Init
<p>To initiate MVG simply create a new MVG object:</p>
<code>var generator = new MobileVersionGenerator();</code>

# Available Tasks
<p><code>mobileVersionGenerator</code> is a constructor that has a few tasks built in.</p>
<ul>
  <li><b>generator.setViewPort()</b> (function): Generate a <code>&lt;meta&gt;</code> tag to setup the viewport.</li>
  <li><b>generator.loadMobileCSS()</b> (function): Inject a <code>&lt;link&gt;</code> with <code>mobileVersion.css</code>.</li>
  <li><b>generator.loadMobileTutorial()</b> (function): Create some HTML tags to display a short tutorial about how to use mobile version sidebar.</li>
</ul>

# Other Tools
<ul>
  <li><b>debug</b> (boolean): Defines if we are on debug mode or not.</li>
  <li><b>log()</b> (function, accepts <code>param</code>): If we are on debug mode print a <code>console.log(param)</code>.</li>
  <li><b>hasReadTheTutorial()</b> (function): Return <code>true|false</code>.</li>
</ul>
