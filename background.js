// On page change send new URL and Title
chrome.webNavigation.onCompleted.addListener(function(details) {
	// Get the tab id from which the navigation was made
	var tabId = details.tabId
	// Get the tab URL and Title, if it has changed since the last call
	chrome.tabs.get(tabId, function(tab) {
		if (window.oldURL != tab.url) {
			console.log(tab.url);
			console.log(tab.title);
		}
		window.oldURL = tab.url
	});
})