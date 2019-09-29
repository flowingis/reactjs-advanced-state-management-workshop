import React, {useReducer} from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';
import actionCreators from './model/actionCreators';
import reducer, { INITIAL_STATE } from './model/reducer';

function App() {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  
  const {
    filter,
    todos
  } = state;

  const notCompletedTodos = todosQueries.notCompletedTodos(todos);
  const allCompleted = todosQueries.allCompletedTodos(todos);
  
  const addTodo = (text) => {
    dispatch(actionCreators.add(text));
  };

  const clearCompleted = () => {
    dispatch(actionCreators.clearCompleted());
  };

  const markAllAsComplete = () => {
    dispatch(actionCreators.toggleAll());
  };

  const toggleCompleted = id => {
    dispatch(actionCreators.toggle(id));
  };

  const updateTodoText = (id, text) => {
    dispatch(actionCreators.changeText(id,text));
  };

  const deleteTodo = id => {
    dispatch(actionCreators.delete(id));
  };

  const changeFilter = filter => {
    dispatch(actionCreators.changeFilter(filter));
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
