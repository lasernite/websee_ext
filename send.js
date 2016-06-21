

window.onload = function() {
	
	var url = window.location.hostname + window.location.pathname;
	var title = document.getElementsByTagName("title")[0].innerHTML;

	fetch("/visits/create.json", {
	  method: "POST",
	  body: {"url": url, "title": title}
	})
};