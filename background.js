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


// On page change send new URL and Title
chrome.webNavigation.onCompleted.addListener(function(details) {
	sendDataIfUrlChange(details);
})

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	sendDataIfUrlChange(details);
})

// Only sends data when URL changes
function sendDataIfUrlChange(details) {
	// Get the tab id from which the navigation was made
	var tabId = details.tabId
	// Get the tab
	chrome.tabs.get(tabId, function(tab) {
		// Send URL and Title, if it has changed since the last call
		if (window.oldUrl != tab.url) {
			var url = tab.url;
			var title = tab.title;

			// Get User ID and Send Data
			chrome.storage.sync.get("user_id", function(user_id) {
				if (user_id == null) {
					sendData(url, title, 1)
				} else {
					sendData(url, title, user_id)
				}
			})

			// Send Data Function
			function sendData(url, title, user_id) {
				var data = JSON.stringify({
				  "url": url,
				  "title": title,
				  "user_id": user_id
				});

				var xhr = new XMLHttpRequest();
				xhr.withCredentials = true;

				// xhr.open("POST", "http://localhost:3000/visits/create.json");
				xhr.open("POST", "https://websee.herokuapp.com/visits/create.json");
				xhr.setRequestHeader("content-type", "application/json");
				xhr.setRequestHeader("charset", "utf-8");
				xhr.setRequestHeader("cache-control", "no-cache");

				xhr.send(data);
			}
		}
		// Update oldUrl with current url, for next call
		window.oldUrl = tab.url
	});
}