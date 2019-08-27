import React, { useState } from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import { ALL } from './model/filters';
import stateUpdaters from './App.state';

function App() {

  const [filter, setFilter] = useState(ALL);
  const [todos, setTodos] = useState([]);

  const notCompletedTodos = todos.filter(t => !t.completed).length;
  const allCompleted = notCompletedTodos === 0;

  const addTodo = (text) => {
    setTodos(stateUpdaters.add(todos, text));
  };

  const clearCompleted = () => {
    setTodos(stateUpdaters.clearCompleted(todos));
  };

  const markAllAsComplete = () => {
    setTodos(stateUpdaters.toggleAll(todos));
  };

  const toggleCompleted = id => {
    setTodos(stateUpdaters.toggle(todos, id));
  };

  const updateTodoText = (id, text) => {
    setTodos(stateUpdaters.changeText(todos, id, text));
  };

  const deleteTodo = id => {
    setTodos(todos => todos.filter(t => t.id !== id));
  };

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
          <Filter current={filter} onChangeFilter={setFilter} />
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
