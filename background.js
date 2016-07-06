// On page change send new URL and Title
chrome.webNavigation.onCompleted.addListener(function(details) {
	sendDataIfUrlChange(details)
})

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	sendDataIfUrlChange(details);
})

function sendDataIfUrlChange(details) {
	// Get the tab id from which the navigation was made
	var tabId = details.tabId
	// Get the tab
	chrome.tabs.get(tabId, function(tab) {
		// Send URL and Title, if it has changed since the last call
		if (window.oldUrl != tab.url) {
			var url = tab.url;
			var title = tab.title;

			var data = JSON.stringify({
			  "url": url,
			  "title": title
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
		// Update oldUrl with current url, for next call
		window.oldUrl = tab.url
	});
}


