// Object of every element on page
var page = {
	header: document.getElementsByTagName('header')[0],
	repolist: document.getElementById('repolist'),
	emailLink: document.getElementById('emailLink'),
	article: document.getElementsByTagName('article')[0]
};

// We don't want email addresses in plain text, this will be an easy target for spam bots.
page.emailLink.onclick = function() {
	window.open('mailto:' + 'me' + '@' + 'erikboesen.com');
};

// This section manages the header changing as you scroll.
window.onscroll = function() {
	scroll = document.body.scrollTop;
	if (scroll >= window.innerHeight * 0.65 && window.innerWidth >= 600) {
		page.header.className = 'small';
		page.header.style.opacity = (scroll - window.innerHeight * 0.65) / 50;
		page.article.style.marginTop = '100vh';
	} else {
		page.header.className = '';
		page.header.style.opacity = 1;
		page.article.style.marginTop = 0;
	}
};

// Fetch list of repositories on /FRCDashboard
var repoContent = new XMLHttpRequest();
repoContent.open('GET', 'https://api.github.com/users/FRCDashboard/repos', false);
repoContent.onreadystatechange = function() {
	var obj = JSON.parse(repoContent.responseText);
	for (var i = 0; obj.length; i++) {
		var name = obj[i].name;
		// Remove :emoji: from start of description for aesthetics
		var desc = obj[i].description.substring(obj[i].description.substring(1, obj[i].description.length).indexOf(':') + 3, obj[i].description.length);
		if (name.substring(0, 6) === 'addon-') {
			page.repolist.innerHTML += '<li><div><h4>' + name.substring(6, name.length) + '</h4><p>' + desc + '</div><a class="button" href="https://github.com/FRCDashboard/' + name + '">Get</a></li>';
		}
	}
};
repoContent.send(null);