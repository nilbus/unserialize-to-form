// Unserialize (to) form plugin
// Version 1.0.2
// Copyright (C) 2010-2011 Christopher Thielen
// Dual-licensed under GPLv2 and the MIT open source licenses

// Notes: Will recurse fieldsets and p tags as they are commonly used in forms.

// Usage: var s = $("form").serialize(); // save form settings
//        $("form").unserializeForm(s);  // restore form settings

// See ChangeLog at end of file for history.

(function($) {
	// takes a GET-serialized string, e.g. first=5&second=3&a=b and sets input tags (e.g. input name="first") to their values (e.g. 5)
	$.fn.unserializeForm = function( _values ) {
		// this small bit of unserializing borrowed from James Campbell's "JQuery Unserialize v1.0"
		_values = _values.split("&");
		
		var serialized_values = new Array();
		$.each(_values, function() {
			var properties = this.split("=");
			
			if((typeof properties[0] != 'undefined') && (typeof properties[1] != 'undefined')) {
				serialized_values[properties[0].replace(/\+/g, " ")] = properties[1].replace(/\+/g, " ");
			}
		});
		
		// _values is now a proper array with values[hash_index] = associated_value
		_values = serialized_values;
		
		// Iterate through each element and set the value
		$(this).add("input,select,textarea").each(function() {
			var tag_name = $(this).attr("name");
			
			// Set the value (key/value storage has the encoded version)
			if(_values[escape(tag_name)] != null) {
				if($(this).attr("type") == "checkbox") {
					$(this).attr("checked", true);
				} else {
					$(this).val(unescape(_values[escape(tag_name)]));
				}
			}
		})
	}
})(jQuery);

// ChangeLog
// 2010-11-19: Version 1.0 release. Works on text, checkbox and select inputs.
// 2011-01-26: Version 1.0.1 release. Fixed regular expression search, thanks Anton.
// 2011-02-02: Version 1.0.2 release. Support for textareas & check for undefined values, thanks Brandon.
// 2011-10-19: Version 1.0.3 release:
//                                    * Fixed unescaping issue for certain encoding elements (@)
