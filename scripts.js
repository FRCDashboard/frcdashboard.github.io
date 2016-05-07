var page = {
	header: document.getElementsByTagName('header')[0],
	repolist: document.getElementById('repolist'),
    emailLink: document.getElementById('emailLink')
};

page.emailLink.onclick = function() {
    window.open('mailto:' + 'me' + '@' + 'erikboesen.com');
};

window.onscroll = function() {
	scroll = document.body.scrollTop;
	if (scroll >= window.innerHeight * 0.65) {
		page.header.className = 'small';
        page.header.style.opacity = (scroll - window.innerHeight * 0.65) / 50;
	} else {
		page.header.className = '';
        page.header.style.opacity = 1;
	}
};

var repoContent = new XMLHttpRequest();
repoContent.open('GET', 'https://api.github.com/users/FRCDashboard/repos', false);
repoContent.onreadystatechange = function() {
	var obj = JSON.parse(repoContent.responseText);
	for (var i = 0; obj.length; i++) {
		var name = obj[i].name;
        var desc = obj[i].description;
		if (name.substring(0, 6) === 'addon-') {
			page.repolist.innerHTML += '<li><div><h4>' + name.substring(6, name.length) + '</h4><p>' + desc + '</div><div class="button-row"><a class="button" href="https://github.com/FRCDashboard/' + name + '/releases">Download</a> <a class="button" href="https://github.com/FRCDashboard/' + name + '">GitHub</a></div></li>';
		}
	}
};
repoContent.send(null);