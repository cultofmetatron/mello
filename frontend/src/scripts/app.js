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

    debugger
    let submissions$ = responses.DOM.get('form.todo', 'submit')
      .map(ev => {
        if (ev) {
          ev.preventDefault();
        }
        console.log('entering');
        return ev
      })


    let todoText$ = responses.DOM.get('form.todo input.new-todo', 'input')
    .map((e) => e.target.value)
    .map((text) => {
        return text;
    });
    //     Rx.Observable.combineLatest
    return Rx.Observable.combineLatest(submissions$, todoText$, (submission, text) => text)
      .doOnNext(text => console.log(text))
      .startWith("")
  }

  let vtree$ = getInputs(responses)  //responses.props.getAll()
  .map((value) =>
    h('div', [
      h('form.todo', {
       
      }, [
        h('div', [
          h('input.new-todo', { placeholder: 'Enter a task'})
        ])
      ])
    ]));
   
  return {
    DOM: vtree$
    //submissions$: responses.DOM.get('form', 'submit')
  };
}



function main(drivers) {
  
  /*
  drivers.DOM.get('form.todo', 'submit')
    .forEach(ev => {
      console.log('hello nurse');
      ev.preventDefault()
    })
  */

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



