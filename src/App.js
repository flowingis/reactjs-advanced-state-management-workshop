import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';

function App({state, actions}) {

  useEffect(() => {
    const unsub = state.addChangeListener(newState => {
      setState(newState);
    });
    return unsub;
  }, [state]);
  
  const [stateValue, setState] = useState(state);

  const notCompletedTodos = todosQueries.notCompletedTodos(stateValue.todos);
  const allCompleted = todosQueries.allCompletedTodos(stateValue.todos);
  
  const {
    todos,
    filter
  } = stateValue;

  const toggleAllInput = todos.length > 0 ? (
    <React.Fragment>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={allCompleted} onChange={actions.toggleAll}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  ) : null;

  return (
    <div>
      <section className="todoapp">
        <Header onNewTodo={actions.add}/>
        <section className="main">
          {toggleAllInput}
          <Todos 
            filter={filter}
            todos={todos} 
            onDeleteTodo={actions.delete}
            onToggleTodo={actions.toggle}
            onSubmitTodo={actions.changeText}/>
        </section>
        <footer className="footer">
          <span className="todo-count">{notCompletedTodos} Item Left</span>
          <Filter current={filter} onChangeFilter={actions.changeFilter} />
          <button className="clear-completed" onClick={actions.clearCompleted}>Clear completed</button>
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

export default App;
