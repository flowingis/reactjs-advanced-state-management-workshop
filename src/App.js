import React, { useState } from 'react';
import uuid from 'uuid/v1';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import { ALL } from './model/filters';

function App() {

  const [filter, setFilter] = useState(ALL);
  const [todos, setTodos] = useState([]);

  const notCompletedTodos = todos.filter(t => !t.completed).length;
  const allCompleted = notCompletedTodos === 0;

  const addTodo = (text) => {
    setTodos(todos => [...todos, {
      id: uuid(),
      text,
      completed: false
    }]);
  };

  const clearCompleted = () => {
    setTodos(todos => todos.filter(t => !t.completed));
  };

  const markAllAsComplete = () => {
    setTodos(todos => todos.map(t => ({
      ...t,
      completed: !allCompleted
    })));
  };

  const toggleCompleted = id => {
    setTodos(todos => todos.map(t => {
      if(t.id !== id) {
        return t;
      }

      return {
        ...t,
        completed: !t.completed
      };
    }));
  };

  const updateTodoText = (id, text) => {
    setTodos(todos => todos.map(t => {
      if(t.id !== id) {
        return t;
      }

      return {
        ...t,
        text
      };
    }));
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
