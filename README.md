Open Validation Library (OpenVL)
================================

Form validation made simple, and extensible.
-------------------------------------------
The goal of the Open Validation Library is to provide a simple form validation library that can be extended to fit any need without any additional requirements.

Currently the library is written in JavaScript for use with web forms, however if anyone would like to translate the library to additional languages for use with other applications please do so.

Features
--------
* Supports HTML5 attributes like min, max, and data
* Has both list and inline type messaging
* Rules can be customized to fit any need
* Supports jQuery, Sizzle, and Dojo frameworks *none of these are required*
* Supported browsers: IE6+, FF3+, Safari 5+

Setup and Usage
---------------
There are a few steps to setup your form for validation.

### Step 1. Format HTML
Start with a form that has a unique ID with each form field and label combination wrapped in a div for inline messaging.

```html
<form id="formID" method="get/post" action="">
	<div class="form">
		<div class="spot">
			<label for="input">Input</label><input id="input" class="form_req">
		</div>
	</div>
</form>
```

### Step 2. Setup JavaScript
Make sure you include the library before you make the calls to instantiate your validation.

```html
<script src="js/OpenValidate-version.js"></script>
```
```javascript
var oval = new OpenVL();
oval.validate({_form:"#formID"});
```
When you call .validate() there are a few options you can pass to adjust how the validation will act.

1. `_form`: This is the ID, class, or element name of the form you want to validate. Default: `document`
2. `_focusBlur`: Sets whether the validation should run on blur of a form element. Default: `true`
3. `uselabels`: Sets whether to use the form labels as part of the error messages. Default: `true`
4. `_msgType`: Sets the messaging type for the form. Default `both`
	* "inline" will only show a message next to the form field.
	* "list" will only show an unordered list of all errors above the form.
	* "both" both message types will be used.
5. `_autoHideMsg`: Sets if messages should auto hide and only show one message at a time. Default: `true`
6. `focusOnSubmitError`: Sets if the form should auto focus the first error on submit. Default: `true`

On demand usage
---------------
There are two ways to call validation on demand

### `exec(string/object)`
Running the exec() function will execute a full form validation and return error messaging.

You can pass either the ID string of the form or the actual DOM object.

```javascript
var oval = new OpenVL();
oval.exec("form");
```

### `test(string/object)`
Running the test() function will execute a full form validation and return only true or false if the entire form is either valid or invalid respectively.

You can pass either the ID string of the form or the actual DOM object.

```javascript
var oval = new OpenVL();
oval.test("form");
```

Clearing validation on a form
-----------------------------

### `clearvalidation(string/object)`
Running the clearvalidation() function will remove all validation functions from the form.
You can pass either the ID string of the form or the actual DOM object.

```javascript
var oval = new OpenVL();
oval.clearvalidation("form");
```

Custom Messaging
----------------
___Thanks to Jeremie Barnes for this!___

Using the HTML5 custom data attribute we can set custom messages for each form control. If no custom message is used then the rule default will be applied.

Custom messages are set per rule per form control. The format is always `data-[rule class]-message=""`

```html
<input id="input" class="form-req" data-form-req-message="Custom message" />
```

Anatomy of a rule
-----------------

```javascript
{id:"", func: function (scope) {}, _class:"", msg:"", useLabels:""}
```

1. id: A unique identifier for the rule.
2. func: The validation function.
3. scope: The form field object gets passed to the function as scope.
4. _class: The class used in the HTML to identify the rule to be applied.
5. msg: The custom error message for this rule.
6. useLabels: sets the option to use form labels in the error message.

Default Ruleset
---------------
The default ruleset is only a small selection of the rules that can be used with the validator, so feel free to write your own.
If you would like to submit a rule to be included in the default ruleset for others to use please email me at cwardzala@gmail.com, include the rule in the above format along with description of the rule.

### Is Required
Tests if the scope's value is null or has a length of zero.

### Is Numeric
Tests if the scope's value is a number.

### Is Email
Tests for a validly formatted email.

### Is The Same
Tests two fields against each other using the form_same and form_same_verify classes.

### Is Checked
Tests if a radio button or checkbox is "checked".

### Is Phone
Checks for a validly formatted phone number with or without dashes (-).

### Is Length
Checks the character count based on the min and max attributes.

### Is Value
Checks the numerical value based on the min and max attributes.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/cwardzala/openvl/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

