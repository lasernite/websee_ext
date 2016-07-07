var el = document.getElementsByTagName("BODY")[0],
    elChild = document.createElement('div');
elChild.innerHTML = 'Content Magic';
el.insertBefore(elChild, el.firstChild);