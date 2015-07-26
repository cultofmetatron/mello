var React = require('react');

var vla = `
 adsfahlsdfh asdfhalshf
 
 `;

var foo = function() {
	console.log(vla);
	return (() => <h1>hello world, you sly emporeer</h1> )();
};

foo()

React.render(foo(), document.getElementById('mountpoint'));