/**
 	Rules 
	Rule Template {id:"", func: function (scope) {}, _class:"form-url", msg:"", useLabels:false}
*/
var Rules = [
	//{id:"isRequired", htmlAttr:'required', func: function (scope) { return (scope.value === null) || (scope.value.length !== 0);}, _class:"form-req", msg:"is a required field.", useLabels:true},
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