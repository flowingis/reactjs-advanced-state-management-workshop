import React, { useState, useEffect, useContext } from 'react';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';
import BusContext from './BusContext';

function App({eventBus}) {

  const [stateValue, setState] = useState(eventBus.getState());
  const {dispatch, eventCreators}  = useContext(BusContext);

  useEffect(() => {
    const unsub = eventBus.subscribe(newState => {
      setState(newState);
    });
    return unsub;
  }, [eventBus]);


  const notCompletedTodos = todosQueries.notCompletedTodos(stateValue.todos);
  const allCompleted = todosQueries.allCompletedTodos(stateValue.todos);
  
  const addTodo = (text) => {
    dispatch(eventCreators.add(text));
  };

  const clearCompleted = () => {
    dispatch(eventCreators.clearCompleted());
  };

  const markAllAsComplete = () => {
    dispatch(eventCreators.toggleAll());
  };

  const toggleCompleted = id => {
    dispatch(eventCreators.toggle(id));
  };

  const updateTodoText = (id, text) => {
    dispatch(eventCreators.changeText(id,text));
  };

  const deleteTodo = id => {
    dispatch(eventCreators.delete(id));
  };

  const changeFilter = filter => {
    dispatch(eventCreators.changeFilter(filter));
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
