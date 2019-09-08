import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';

function App({state}) {

  useEffect(() => {
    const unsub = state.addChangeListener(newState => {
      setState(newState);
    });
    return unsub;
  }, [state]);
  
  const [stateValue, setState] = useState(state.get());

  const notCompletedTodos = todosQueries.notCompletedTodos(stateValue.todos);
  const allCompleted = todosQueries.allCompletedTodos(stateValue.todos);
  
  const {
    todos,
    filter
  } = stateValue;

  const toggleAllInput = todos.length > 0 ? (
    <React.Fragment>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={allCompleted} onChange={state.toggleAll}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  ) : null;

  return (
    <div>
      <section className="todoapp">
        <Header onNewTodo={state.add}/>
        <section className="main">
          {toggleAllInput}
          <Todos 
            filter={filter}
            todos={todos} 
            onDeleteTodo={state.delete}
            onToggleTodo={state.toggle}
            onSubmitTodo={state.changeText}/>
        </section>
        <footer className="footer">
          <span className="todo-count">{notCompletedTodos} Item Left</span>
          <Filter current={filter} onChangeFilter={state.changeFilter} />
          <button className="clear-completed" onClick={state.clearCompleted}>Clear completed</button>
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
