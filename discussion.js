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

xhr.open("GET", "https://www.websee.io/visits/url?url=" + encodeURIComponent("https://www.reddit.com/"));
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send();