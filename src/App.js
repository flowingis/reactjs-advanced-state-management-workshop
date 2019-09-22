import React from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';
import withDispatch from './withDispatch';
import withState from './withState';

function App({state, events}) {

  const {
    shouldShowToggleAll,
    allCompleted,
    notCompletedTodos
  } = state;

  const toggleAllInput = shouldShowToggleAll ? (
    <React.Fragment>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={allCompleted} onChange={events.toggleAll}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  ) : null;

  return (
    <div>
      <section className="todoapp">
        <Header/>
        <section className="main">
          {toggleAllInput}
          <Todos/>
        </section>
        <footer className="footer">
          <span className="todo-count">{notCompletedTodos} Item Left</span>
          <Filter />
          <button className="clear-completed" onClick={events.clearCompleted}>Clear completed</button>
        </footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://twitter.com/thestrazz86">Francesco Strazzullo</a></p>
        <p>Thanks to <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </div>
  );
}

const query = state => ({
  notCompletedTodos: todosQueries.notCompletedTodos(state.todos),
  allCompleted: todosQueries.allCompletedTodos(state.todos),
  shouldShowToggleAll: state.todos.length > 0
});

export default withDispatch(
  withState(App, query), 
  'toggleAll',
  'clearCompleted'
);
