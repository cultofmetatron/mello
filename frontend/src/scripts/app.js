var React = require('react');
var nav = require('./components/navigation/navigation-view.js').navigation;

import Cycle from '@cycle/core';
import { Rx } from '@cycle/core';
import CycleDom  from '@cycle/dom';
import { makeDOMDriver, h } from '@cycle/dom';


//React.render(nav, document.getElementById('mountpoint'));

//represents a form for the todo
function todoForm(responses) {

  

  let vtree$ = responses.props.getAll()
  .map(() =>
    h('form', [
      h('div', [
        h('input', { placeholder: 'Enter a task'})
      ])
    ]));
   
  return {
    DOM: vtree$
  };
}



function main(drivers) {
  let clicks$ = drivers.DOM.get('input', 'click');

  let clicksCount$ = clicks$
    .map(ev => 1)
    .startWith(1)
    .scan((x, y) => x + y);

  let clicksCountfactor$ = clicksCount$
    .scan((x, y) => x * y);

  let toggled$ = clicks$
    .map(ev => ev.target.checked)
    .startWith(false);

  return {
    DOM: Rx.Observable.combineLatest(
      toggled$,
      clicksCount$,
      clicksCountfactor$,
      (checked, count, factor) => {
        return h('div', [
          h('input', { type: 'checkbox'}),
          h('todo-form'),
          'Toggle me',
          h('p', checked ? 'ON' : 'off'),
          h('p', count + ''),
          h('p', factor + '')
        ])
      }),
  };
}

let drivers = {
  DOM: makeDOMDriver('#mountpoint', {
    'todo-form': todoForm
  })
};


Cycle.run(main, drivers);



