var React = require('react');
var nav = require('./components/navigation/navigation-view').navigation;

import Cycle from '@cycle/core';
import CycleDom from '@cycle/dom';
import { makeDOMDriver, h } from '@cycle/dom';


//React.render(nav, document.getElementById('mountpoint'));


function main(drivers) {
	return {
		DOM: drivers.DOM.get('input', 'click')
			.map(ev => ev.target.checked)
			.startWith(false)
			.map(toggled =>
				h('div', [
					h('input', { type: 'checkbox'}),
					'Toggle me',
					h('p', toggled ? 'ON' : 'off')
				])
			)
	}
}

let drivers = {
	DOM: CycleDom.makeDOMDriver('#mountpoint')
};


Cycle.run(main, drivers);



