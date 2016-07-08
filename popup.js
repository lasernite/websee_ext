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
		xhr.open("GET", "https://www.websee.io/visits/url?url=" + encodeURIComponent(tabs[0].url));
		// xhr.open("GET", "http://localhost:3000/visits/url?url=" + encodeURIComponent(tabs[0].url));

		xhr.setRequestHeader("cache-control", "no-cache");

		xhr.send();
	});

