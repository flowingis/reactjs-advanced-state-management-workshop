import React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import Filter from './components/Filter';
import Todos from './components/Todos';
import todosQueries from './queries/todos';
import actionCreators from './model/actionCreators';


function App(props) {

  const {
    toggleAll,
    allCompleted,
    shouldShowToggleAll,
    notCompletedTodos,
    changeFilter,
    clearCompleted
  } = props;

  const toggleAllInput = shouldShowToggleAll ? (
    <React.Fragment>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={allCompleted} onChange={toggleAll}/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </React.Fragment>
  ) : null;

  return (
    <div>
      <section className="todoapp">
        <Header/>
        <section className="main">
          {toggleAllInput}
          <Todos />
        </section>
        <footer className="footer">
          <span className="todo-count">{notCompletedTodos} Item Left</span>
          <Filter onChangeFilter={changeFilter} />
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

const selectors = state => {
  const notCompletedTodos = todosQueries.notCompletedTodos(state.todos);
  const allCompleted = todosQueries.allCompletedTodos(state.todos);
  const shouldShowToggleAll = state.todos.length > 0;

  return {
    notCompletedTodos,
    allCompleted,
    shouldShowToggleAll
  };
};

const mapDispatchToProps = dispatch => ({
  clearCompleted: () => dispatch(actionCreators.clearCompleted()),
  toggleAll: () => dispatch(actionCreators.toggleAll()),
  changeFilter: filter => dispatch(actionCreators.changeFilter(filter))
});

export default connect(
  selectors,
  mapDispatchToProps
)(App);
