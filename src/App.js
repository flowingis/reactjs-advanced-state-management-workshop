import React from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';
import withDispatch from './withDispatch';
import withState from './withState';

function App({state, events}) {

  const notCompletedTodos = todosQueries.notCompletedTodos(state.todos);
  const allCompleted = todosQueries.allCompletedTodos(state.todos);
  
  const {
    todos,
    filter
  } = state;

  const toggleAllInput = todos.length > 0 ? (
    <React.Fragment>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={allCompleted} onChange={events.toggleAll}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  ) : null;

  return (
    <div>
      <section className="todoapp">
        <Header onNewTodo={events.add}/>
        <section className="main">
          {toggleAllInput}
          <Todos 
            filter={filter}
            todos={todos} 
            onDeleteTodo={events.delete}
            onToggleTodo={events.toggle}
            onSubmitTodo={events.changeText}/>
        </section>
        <footer className="footer">
          <span className="todo-count">{notCompletedTodos} Item Left</span>
          <Filter current={filter} onChangeFilter={events.changeFilter} />
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

export default withDispatch(
  withState(App), 
  'add',
  'changeFilter',
  'delete',
  'changeText',
  'toggle',
  'toggleAll',
  'clearCompleted'
);
