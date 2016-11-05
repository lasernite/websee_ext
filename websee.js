/*  
    Copyright 2016 Laser Nite

    This file is part of Websee Extension.

    Websee Extension is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Websee Extension is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Websee Extension.  If not, see <http://www.gnu.org/licenses/>.
*/

// Jquery equivalent of document ready
// Source Attribution: http://stackoverflow.com/questions/9899372/pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
(function(funcName, baseObj) {
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);


// After document is ready do all this stuff
docReady(function() {
    // Write user_id to local_storage if its null or changed
    var user_id_component = document.getElementById("user_id");
    // Make sure it's not null
    if (user_id_component != null) {
        // Only update if it's changed
        chrome.storage.sync.get("user_id", function(user_id) {
            new_user_id = user_id_component.innerHTML;
            if (user_id == null) {
                chrome.storage.sync.set({"user_id": new_user_id});
            } 
            // If its changed, save new id
            else if (new_user_id != user_id['user_id']) {
                chrome.storage.sync.set({"user_id": new_user_id});
            };
        });   
    };
    
	// Show logged in stuff and hide logged out stuff
	var loggedIn = document.getElementsByClassName("logged_in");
	var loggedOut = document.getElementsByClassName("logged_out");

	for (var i = 0; i < loggedIn.length; i++) {
		loggedIn[i].className = loggedIn[i].className.replace(/\bhidden\b/,'');
	};

	for (var i = 0; i < loggedOut.length; i++) { 
		loggedOut[i].className += " hidden"
	};
});


