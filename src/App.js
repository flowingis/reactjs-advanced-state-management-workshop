import React, { useState } from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import { ALL } from './model/filters';
import todosModel from './model/todos';

function App() {

  const [filter, setFilter] = useState(ALL);
  const [todos, setTodos] = useState([]);

  const notCompletedTodos = todos.filter(t => !t.completed).length;
  const allCompleted = notCompletedTodos === 0;

  const addTodo = (text) => {
    setTodos(todosModel.add(todos, text));
  };

  const clearCompleted = () => {
    setTodos(todosModel.clearCompleted(todos));
  };

  const markAllAsComplete = () => {
    setTodos(todosModel.toggleAll(todos));
  };

  const toggleCompleted = id => {
    setTodos(todosModel.toggle(todos, id));
  };

  const updateTodoText = (id, text) => {
    setTodos(todosModel.changeText(todos, id, text));
  };

  const deleteTodo = id => {
    setTodos(todosModel.delete(todos, id));
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
