import React, { useState } from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';

function App({state}) {

  const [stateValue, setState] = useState(state.get());

  const notCompletedTodos = todosQueries.notCompletedTodos(stateValue.todos);
  const allCompleted = todosQueries.allCompletedTodos(stateValue.todos);
  
  const addTodo = (text) => {
    setState(state.add(text));
  };

  const clearCompleted = () => {
    setState(state.clearCompleted());
  };

  const markAllAsComplete = () => {
    setState(state.toggleAll());
  };

  const toggleCompleted = id => {
    setState(state.toggle(id));
  };

  const updateTodoText = (id, text) => {
    setState(state.changeText(id, text));
  };

  const deleteTodo = id => {
    setState(state.delete(id));
  };

  const changeFilter = filter => {
    setState(state.changeFilter(filter));
  };

  const {
    todos,
    filter
  } = stateValue;

  const toggleAllInput = todos.length > 0 ? (
    <React.Fragment>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={allCompleted} onChange={markAllAsComplete}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  ) : null;

  return (
    <div>
      <section className="todoapp">
        <Header onNewTodo={addTodo}/>
        <section className="main">
          {toggleAllInput}
          <Todos 
            filter={filter}
            todos={todos} 
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleCompleted}
            onSubmitTodo={updateTodoText}/>
        </section>
        <footer className="footer">
          <span className="todo-count">{notCompletedTodos} Item Left</span>
          <Filter current={filter} onChangeFilter={changeFilter} />
          <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
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
