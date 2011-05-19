Open Validation Library (OpenVL)
================================
More info at http://openvl.info

Form validation made simple, and extensible.
-------------------------------------------
The goal of the Open Validation Library is to provide a simple form validation library that can be extended to fit any need without any additional requirements.

Currently the library is written in JavaScript for use with web forms, however if anyone would like to translate the library to additional languages for use with other applications please do so.

Features
--------
* Supports HTML5 attributes like min and max
* Has both list and inline type messaging
* Rules can be customized to fit any need
* Supports jQuery, Sizzle, and Dojo frameworks, none of these are required
* Supported browsers: IE6+, FF3+, Safari 5+

Setup and Usage
---------------
There are a few steps to setup your form for validation.

### Step 1. Format HTML
Start with a form that has a unique ID with each form field and label combination wrapped in a div for inline messaging.
`
	<form id="formID" method="get/post" action="">
		<div class="form">
			<div class="spot">
				<label for="input">Input</label><input id="input" class="form_req">
			</div>
		</div>
	</form>
`
### Step 2. Setup JavaScript
Make sure you include the library before you make the calls to instantiate your validation.

`	<script src="js/OpenValidate-version.js"></script>
	var oval = new OpenVL();
	oval.validate({_form:"#formID"});`
When you call .validate() there are a few options you can pass to adjust how the validation will act.
				<ol>
					<li><code>_form</code>: This is the ID, class, or element name of the form you want to validate. Default: <code>document</code></li>
					<li><code>_focusBlur</code>: Sets whether the validation should run on blur of a form element. Default: <code>true</code></li>
					<li><code>uselabels</code>: Sets whether to use the form labels as part of the error messages. Default: <code>true</code></li>
					<li><code>_msgType</code>: Sets the messaging type for the form. Default <code>both</code>
						<ul>
							<li>"inline" will only show a message next to the form field.</li>
							<li>"list" will show only an unordered list of all errors above the form.</li>
							<li>"both" both message types will be used.</li>
						</ul>
					</li>
				</ol>