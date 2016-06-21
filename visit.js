

window.onload = function() {
	
	var url = window.location.hostname + window.location.pathname;
	var title = document.getElementsByTagName("title")[0].innerHTML;

	var data = JSON.stringify({
	  "url": url,
	  "title": title
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	    console.log(this.responseText);
	  }
	});

	xhr.open("POST", "https://websee.herokuapp.com/visits/create.json");
	xhr.setRequestHeader("content-type", "application/json");
	xhr.setRequestHeader("charset", "utf-8");
	xhr.setRequestHeader("cache-control", "no-cache");
	xhr.setRequestHeader("postman-token", "dce8c16c-477b-198f-d1d2-8b5356ce7ffb");

	xhr.send(data);

};