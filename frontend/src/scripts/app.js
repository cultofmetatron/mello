var React = require('react');
var nav = require('./components/navigation/navigation-view.js').navigation;

import Cycle from '@cycle/core';
import { Rx } from '@cycle/core';
import CycleDom  from '@cycle/dom';
import { makeDOMDriver, h } from '@cycle/dom';


//React.render(nav, document.getElementById('mountpoint'));

//represents a form for the todo
function todoForm(responses) {

  
  function getInputs(responses) {
    let submissions$ = responses.DOM.get('form.todo', 'mouseenter')
    .doOnNext((e) => {
      console.log(e);
      e.preventDefault();
    });

    let todoText$ = responses.DOM.get('form input.new-todo', 'input')
    .map((e) => e.target.value)
    .map((text) => {
        return text;
    });

    return todoText$.debounceWithSelector(() => submissions$)
      .map((text) => {
        console.log('hadooken')
        return text;
      })
      .startWith("")

  }

  let vtree$ = getInputs(responses)  //responses.props.getAll()
  .map((value) =>
    h('form.todo', {
      onsubmit: 'inputSubmits$'
    }, [
      h('div', [
        h('input.new-todo', { placeholder: 'Enter a task'})
      ])
    ]));
   
  return {
    DOM: vtree$
  };
}



function main(drivers) {
  let clicks$ = drivers.DOM.get('input.checky', 'click');

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
          h('input.checky', { type: 'checkbox'}),
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



