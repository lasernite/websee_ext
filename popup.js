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

// Get URL and Load Corresponding Websee Discussion
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
  	var el = document.getElementsByTagName("BODY")[0],
    	 elChild = document.createElement('div');
	elChild.innerHTML = this.responseText;
	el.insertBefore(elChild, el.firstChild);
  }
});

chrome.tabs.query({active: true, currentWindow: true}, 
	function callback(tabs) {

		xhr.open("POST", "https://www.websee.io/visits/url") ;
		// xhr.open("POST", "http://localhost:3000/visits/url");

        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("charset", "utf-8");
		xhr.setRequestHeader("cache-control", "no-cache");

        var data = JSON.stringify({ "url": tabs[0].url });
        //encodeURIComponent(tabs[0].url)

		xhr.send(data);
	});

