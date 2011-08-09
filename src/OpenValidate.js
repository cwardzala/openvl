/*
 *	Open Validation Library
 *	Copyright (c) 2011, Cameron Wardzala
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *	THE SOFTWARE.
 */


/**
 * Core functions
 * A collection of reuseable functions for manipulation and traversal of the dom.
 * 
 * Unique parses an array and returns only unique results.
 * @param a
 * @returns Array with only unique members.
 * 
 * Find Index function when passed a DOM element and array of elements will find the index of the original element.
 * @param ele DOM element to be identified.
 * @param arr Array of DOM elements.
 * @returns int index of original element in array.
 * 
 * Extend function will take two objects and combine them keeping only the latest unique members.
 * @param obj The original object to be extended.
 * @param extObj The new object that will extend the original.
 * @returns Single combined object with unique memebers.
 * 
 * Has Class function will check if a DOM object has the specified class.
 * @param ele DOM element to be checked.
 * @param cls Class to be checked.
 * @returns true if it has the class, false if not.
 * 
 * Add Class function will add the specified class to the specified DOM object.
 * @param ele Element to be manipulated.
 * @param cls Class to be added.
 * 
 * Remove Class function will remove the specified class from the specified DOM object.
 * @param ele Element to be maniuplated.
 * @param class Class to be removed.
 * 
 * Return Label function will return text from the corresponding label for the given form field.
 * @param ele Form field.
 * @returns Text of corresponding label.
 * 
 * Prepend function will place the passed DOM object before the designated target.
 * @param ele DOM object to be placed.
 * @param target DOM object
 * 
 * Is Browser function will return true or false if specified browser is in use.
 * @param string The browser name to test for.
 * @returns true if browser is in use, false if not.
 * 
 * Query function, when passed a scope object, and a string criteria in css syntax (id: #idname, class: .classname, element: div) will return an array of matched elements.
 * @param scope The DOM object to be queried, defaults to document.
 * @param string Class name, ID, or element name(s) in css format.
 * @returns An array of matched elements.
 */

/** 
 * Thanks to Keith Clark (@keithclarkcouk) for this selector engine parser
 * Taken from selectivizr.js
 * http://selectivizr.com/
 *
 * Compatiable selector engines in order of CSS3 support. Note: '*' is
 * a placholder for the object key name. (basically, crude compression)
 */
var selectorEngines = {
	"Sizzle"	: "*", 
	"jQuery"	: "*",
	"dojo"		: "*.query"
},
OVLengine = null, engineName = null, win = this;
// Determine the "best fit" selector engine
for (var engine in selectorEngines) {
	var members, member, context = win;
	if (win[engine]) {
		members = selectorEngines[engine].replace("*", engine).split(".");
		while ((member = members.shift()) && (context = context[member])) {}
		if (typeof context == "function") {
			OVLengine = context;
			engineName = engine;
		}
	}
}

var query = function (string,scope) {
	scope = scope || document;
	if (OVLengine !== null) {
		return OVLengine(string,scope);
	} else {
		var es = string.replace(' ','').split(','), esl = es.length, retnode = [], elem = scope.getElementsByTagName('*'), el = elem.length, r=[],i,ei;
		for (i = 0; i < el; i++) {
			for (ei = 0; ei<esl; ++ei) {
				var type = es[ei].charAt(0), value = es[ei].replace(type,'');
				if (type === "#") {if (elem[i].id === value) {retnode.push(elem[i]);}}
				else if (type === ".") {var myclass = new RegExp(value+'(?=\s)|'+value+'(?!\s)'), classes = elem[i].className; if (myclass.test(classes)) {retnode.push(elem[i]);} }
				else { if (elem[i].nodeName === es[ei].toUpperCase()) { retnode.push(elem[i]);} }
			}
		}
		// Utilize the unique function rather than recreate it here.
		return unique(retnode);
	}
};

var unique						= function (a)				{ var r = [],i,x,y,n; o:for(i = 0, n = a.length; i < n; i++){ for(x = 0, y = r.length; x < y; x++){ if(r[x]===a[i]) {continue o;} } r[r.length] = a[i]; } return r; };
var findIndex					= function (ele,arr)		{ var ctr = "",i; for (i=0; i < arr.length; i++) { if (arr[i] === ele) { return i; } } return ctr; };
var extend						= function (obj, extObj)	{ var i,a; if (arguments.length > 2) { for (a = 1; a < arguments.length; a++) { extend(obj, arguments[a]); } } else { for (i in extObj) { obj[i] = extObj[i]; } } return obj; };
var hasClass					= function (ele,cls)		{ return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); };
var addClass					= function (ele,cls)		{ if (!hasClass(ele,cls)) { ele.className += " "+cls;} };
var removeClass					= function (ele,cls)		{ if (hasClass(ele,cls)) { var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); ele.className=ele.className.replace(reg,' '); } };
var ReturnLabel					= function (ele)			{ if (ele !== undefined && ele.nodeType === 1 && ele.nodeName === "LABEL") { var text = ele.innerText || ele.textContent; return text.replace(/\([^)]* \)/g,'').replace(/[^a-zA-Z 0-9]+/g,'').replace(/^\s*|\s*$/g,'');} };
var prepend						= function (ele,target)		{ if ( target.nodeType === 1 ) { target.insertBefore( ele, target.firstChild );} };
var isBrowser					= function (string)			{ return (navigator.userAgent.indexOf(string)>=0);};
var ovlPreviousSibling			= function (o)				{ do o = o.previousSibling; while (o && o.nodeType != 1); return o; }
var parentNode					= function (ele)			{ var parent = ele.parentNode; if ( hasClass(parent.parentNode,"group") ) {parent = parent.parentNode;} return parent; }

/**
 	Rules 
	Rule Template {id:"", func: function (scope) {}, _class:"form-url", msg:"", useLabels:false}
*/
var Rules = [
	{id:"isRequired", func: function (scope) { return (scope.value === null) || (scope.value.length !== 0);}, _class:"form-req", msg:"is a required field.", useLabels:true},
	{id:"isNumeric", func: function (scope) { var re = new RegExp(/^([0-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[0-9]\d*)$/); return re.test(scope.value);}, _class:"form-number", msg:"can only be a number.", useLabels:true},
	{id:"isEmail", func: function (scope) { var re = /^[^\s()<>@,;:\/]+@\w[\w\.\-]+\.[a-z]{2,}$/i;return re.test(scope.value);}, _class:"form-email", msg:"is an invalid email address.", useLabels:true},
	{id:"istheSame", func:function (scope) { 
		var allSame = query('#'+scope.getAttribute('data-form-same-id'))[0]; 
			if (scope.value !== allSame.value || scope.value === '') {
				this.msg = ReturnLabel(ovlPreviousSibling(allSame))+" and "+ReturnLabel(ovlPreviousSibling(scope))+" should be the same.";
				return false;
			}
			return true;
		}, _class:"form-same_verify", msg:"No Match", useLabels:false},
	{id:"isChecked", func: function (scope) { var checkElms = document.getElementsByName(scope.name), cei, chx = []; for (cei=0;cei<checkElms.length;++cei){ if (checkElms[cei].checked !== false) {chx.push(checkElms[cei]);} } if (chx.length > 0) {return true;} else { return false; } }, _class:"form-check", msg:"You Must Choose an Option", useLabels:false},
	{id:"isPhone", func: function (scope) {var re = /^(1\s*[\-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[\-\/\.]?\s*(\d{3})\s*[\-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])\.?\s*(\d+))*$/;return re.test(scope.value);}, _class:"form-phone", msg:"You must enter a valid phone number.", useLabels: false},
	{id:"isLength", func: function (scope) { var str = scope.value; var min = parseInt(scope.getAttribute("min"),10) || 1; var max = parseInt(scope.getAttribute("max"),10); if (min === max){ this.msg = "Your input must be "+max+" characters in length"; return (str.length === min); } else { this.msg = "Your input must be between "+min+" and "+max; return (str.length >= min) && (str.length <= max); } }, _class:"val-length", msg:"you must only enter ## characters", useLabels:false},
	{id:"isValue", func: function (scope) { var val = parseInt(scope.value,10), min = parseInt(scope.getAttribute("min"),10), max = parseInt(scope.getAttribute("max"),10); if (min === max) { return (val === min); } else { return (val >= min) && (val <= max); } }, _class:"form-value", msg:"test", useLabels:false},
	{id:"isURL", func: function (scope) {
		var re = /(https?:\/\/)?(www\.)?([a-zA-Z0-9_%-]*)\b\.[a-z]{2,4}(\.[a-z]{2})?((\/[a-zA-Z0-9_%-]*)+)?(\.[a-z]*)?/;
		return re.test(scope.value);
	}, _class:"form-url", msg:"", useLabels:false}
];


var RulesById = function (id) { for (var r = 0; r<Rules.length;++r) { if (Rules[r].id === id) { return Rules[r]; } } };
var RulesByClass = function (cls) { for (var r = 0; r<Rules.length;++r) { if (Rules[r]._class === cls) { return Rules[r]; } } };

/* OpenVL class */
var OpenVL = function (form) { 
	if ( this instanceof OpenVL ) {
		var ovl = this;
		this.$form = query(form);
		this.opts = {msg:"",focusBlur:true,uselabels:true,msgType:"both",autoHideMsg:true,focusOnSubmitError: true};
		this.AllErrors = [];
		this.currentEvent = null;
		this.validate = function (options) {
			ovl.opts = extend(ovl.opts, options);
			var forms = query(ovl.$form), fL = forms.length;
			for (var fi=0;fi<fL;fi++) {
				if (ovl.opts.focusBlur === true){
					var formInputs = query('input,select,textarea',forms[fi]), fil = formInputs.length, type;
					for(var i=0;i<fil;++i) {
						type = formInputs[i].getAttribute("type");
						if(type !== "submit") {
							formInputs[i].onblur = (function(f) { return function(){ ovl.blur(this,f); }; })(forms[fi]);
							formInputs[i].onfocus = (function(f) { return function(){ ovl.focus(this,f); }; })(forms[fi]);
							if (isBrowser("Safari") && (type === "radio" || type === "checkbox")) {
								formInputs[i].onclick = (function(f) { return function(){ ovl.blur(this,f); }; })(forms[fi]);
							}
						}
					}
				}
				if (ovl.opts.msgType === "both" || ovl.opts.msgType === "list") {
					if (query('.MessageArea',forms[fi]).length === 0) {
						var msgdiv = document.createElement('div');
						msgdiv.className = 'MessageArea';
						prepend(msgdiv, forms[fi]);
					}
				}
				if (forms[fi].nodeName === "FORM") {
					forms[fi].setAttribute('novalidate',''); // disables browser based validation.
					var oldHandler = forms[fi].onsubmit;
					forms[fi].onsubmit = function(e) {
						ovl.currentEvent = 'submit';
						if(oldHandler){
							var oldHandlerReturnValue = oldHandler();
							var ovlReturnValue = ovl.exec(this);
							if (oldHandlerReturnValue == true && ovlReturnValue == true) { return true; } 
							else { return false; }
						} 
						else { return ovl.exec(this); }
					}
				}
			}
		
		};
		this.doit = function (scope) {
			var form = ovl.$form;
			var test, parent = parentNode(scope), label = query("label",parent), labelText = '', classes = scope.getAttribute('data-ovl-rules').split(' ');
			if (ovl.opts.uselabels !== false) {
				for (var l = 0; l < label.length; ++l) {
					if ((label[l].getAttribute('for') === scope.id || label[l].getAttribute('htmlFor') === scope.id)) {
						labelText = ReturnLabel(label[l]);
					}
				}
			}
			for (var r=0;r<classes.length;++r) {
				var Rule = RulesByClass(classes[r]) || null;
				if (Rule !== null) {
					test = Rule.func(scope) && test;
					if (test === false) {
						var message = Rule.msg;
						if (scope.getAttribute("data-" +Rule._class+"-message")) { ovl.opts.message = scope.getAttribute("data-" + Rule._class+"-message"); }
						else if (Rule.useLabels === true) { ovl.opts.message = labelText +" "+ message;  } 
						else { ovl.opts.message = message; }
						ovl.AllErrors.push(ovl.opts.message);
						break;
					}
				}
			}
			return test;
		};
		this.blur = function (ele) {
			var form = ovl.$form;
			ovl.currentEvent = (ovl.currentEvent === 'blur') ? ovl.currentEvent : 'blur';
			var parent = parentNode(ele), allErrorDivs = query('.err_box',form), aitype = ele.getAttribute('type');
			if (ovl.doit(ele) === false && ( !!ele.getAttribute('required') || (!ele.getAttribute('required') && (aitype !== 'radio' && aitype !== 'checkbox') && ele.value !== "") ) ) {
				ovl.errors.build(ele,form);
				allErrorDivs = query('.err_box',form);
				if (allErrorDivs.length !== 0){ for (var errs=0; errs<allErrorDivs.length;++errs){ ovl.errors.hide(errs,form); } ovl.errors.show(0,form); } 
				else if (allErrorDivs.length === 0) { ovl.errors.show(0,form); }
			} else {
				ovl.errors.clear(ele,form);
				allErrorDivs = query('.err_box',form);
				if (allErrorDivs.length !== 0){ ovl.errors.show(0,form); }
			}
		};
		this.focus = function (ele) {
			var form = ovl.$form, parent = parentNode(ele),
				allErrorDivs = query('.form_err_wrapper',form),
				allerrs = query('.err_box',form),
				eindex = findIndex(parent, allerrs);
			if (hasClass(parent,"err_box")){ 
				allerrs = query('.err_box',form);
				for (var errs=0; errs<allErrorDivs.length;++errs) { 
					ovl.errors.hide(errs,form); 
				} 
				ovl.errors.show(eindex,form);
			}
		};
		this.exec = function () {
			var scope = ovl.$form;
			ovl.AllErrors = [];
			if (typeof scope === "string") {scope = document.getElementById(scope);}
			var allI = query('input,select,textarea',scope), noerrors = true, ali = allI.length;
			for (var ai=0;ai<ali;++ai){
				var aielm = allI[ai], aitype = aielm.getAttribute("type");
				if ( aitype !== "submit" && aitype !== "hidden"){
					if ( !!aielm.getAttribute('required') || (!aielm.getAttribute('required') && (aitype !== 'radio' && aitype !== 'checkbox') && aielm.value !== "") ) {
						if (ovl.doit(aielm) === false){ ovl.errors.build(aielm,scope); noerrors=false;}
						else { ovl.errors.clear(aielm,scope); }
					}
				}
			}
			var allerrs = query('.err_box',scope);
			for (var errs=0; errs<allerrs.length;++errs) { ovl.errors.hide(errs,scope); }
			if (!noerrors) { ovl.errors.show(0,scope); }
			return noerrors;
		};
		this.test = function () {
			var scope = ovl.$form;
			if (typeof scope === "string") {scope = document.getElementById(scope);}
			var allI = query('input,select,textarea',scope), noerrors = true, ali = allI.length;
			for (var ai=0;ai<ali;++ai){
				var aielm = allI[ai];
				if (aielm.getAttribute("type") !== "submit" && aielm.getAttribute("type") !== "hidden"){
					if ( !!aielm.getAttribute('required') || (!aielm.getAttribute('required') && (aitype !== 'radio' && aitype !== 'checkbox') && aielm.value !== "") ) {
						if (ovl.doit(aielm) === false){ noerrors=false; }
					}
				}
			}
			return noerrors;
		};
		this.clearvalidation = function () {
			var forms = ovl.$form, fL = forms.length;
			for (var fi=0;fi<fL;fi++) {
				var thisForm = forms[fi], formInputs = query('input,select,textarea',thisForm),input;
				for(var i=0;i<formInputs.length;++i) {
					if (formInputs[i].getAttribute("type") !== "submit" && formInputs[i].getAttribute("type") !== "hidden"){
						if (ovl.opts.focusBlur === true){ input = formInputs[i]; input.onblur = ""; input.onfocus = ""; }
						if (formInputs[i].getAttribute("type") != "submit") { ovl.errors.clear(formInputs[i],forms); }
					}
				}
				if (query('.MessageArea',thisForm).length !== 0) {thisForm.removeChild(query('.MessageArea',thisForm)[0]);}
				if (forms[fi].nodeName === "FORM") { forms[fi].onsubmit = ""; }
			}
		};
		this.errors = {
			inlineTmpl: function (text) {
				var tmp = document.createElement('div'), nd = null;
				tmp.innerHTML = '<div class="form_err_wrapper"><div class="form_err_msg">'+text+'</div></div>';
				nd = tmp.firstChild;
				//document.removeChild(tmp);
				return nd;
			},
			build:function (scope) {
				//ovl.AllErrors.push(ovl.opts.message);
				console.log(ovl.AllErrors);
				var form = ovl.$form, parent = parentNode(scope), errorDiv = ovl.errors.inlineTmpl(ovl.opts.message);
				if (!hasClass(parent,'err_box')){ addClass(parent, "err_box");}
				if (ovl.opts.msgType === "both" || ovl.opts.msgType === "inline"){
					if (query('.form_err_wrapper',parent).length === 0 && errorDiv !== null){
						parent.appendChild(errorDiv);
					} else {
						errorDiv = query('.form_err_msg',parent)[0];
						errorDiv.innerHTML = ovl.opts.message;
					}
					
				}
				if (ovl.opts.msgType === "both" || ovl.opts.msgType === "list"){
					var theErrors = unique(ovl.AllErrors),
						ErrorsHTML = '<ul>';
					for (var ei=0;ei<theErrors.length;++ei){ ErrorsHTML += '<li>'+theErrors[ei]+'</li>'; }
						ErrorsHTML += '</ul>';
					if (query('.MessageArea',form)) {query('.MessageArea',form)[0].innerHTML=ErrorsHTML;}
				}
			},
			show:function (index,form) {
				var errboxes = query('.err_box',form);
				if (ovl.opts.msgType === "both" || ovl.opts.msgType === "inline"){
					query('.form_err_wrapper',errboxes[index])[0].style.display="block";
				}
				if (ovl.opts.focusOnSubmitError === true && ovl.currentEvent === 'submit') {
					query('input, textarea, select',errboxes[0])[0].focus();
				}
			},
			hide:function (index,form) {
				if ((ovl.opts.msgType === "both"||ovl.opts.msgType === "inline") && ovl.opts.autoHideMsg === true) { 
					var errboxes = query('.err_box',form); 
					query('.form_err_wrapper',errboxes[index])[0].style.display="none"; 
				} 
			},
			clear:function (scope,form) {
				var parent = parentNode(scope),
					ei = query('.err_box',form),
					ma = query('.MessageArea',form),
					mali = query('li',ma),
					mai = mali.length,
					sei = query('.form_err_msg',parent),
					seit = '';
				if (sei.length > 0) { seit = sei[0].innerText || sei[0].textContent; }
				removeClass(parent, "err_box");
				if (ovl.opts.msgType === "both"|| ovl.opts.msgType === "inline") {
					if (query('.form_err_wrapper',parent).length !== 0) {
						parent.removeChild(query('.form_err_wrapper',parent)[0]);
					}
				}
			
				if ((ei.length) === 0) {
					if((ma.length) !== 0) {ma.innerHTML="";}
					ovl.AllErrors=null;
					ovl.AllErrors=[];
				} 
			}
		};
	} else { return new OpenVL(form); }
};