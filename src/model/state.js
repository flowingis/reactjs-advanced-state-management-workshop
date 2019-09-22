import clone from 'lodash.clonedeep';
import todoModel from './todos.js';
import filterModel from './filters.js';

const INITIAL_STATE = {
  todos: [],
  filter: 'All'
};

export default (initalState = INITIAL_STATE) => {
  return (prevState, event) => {
    if (!event) {
      return clone(initalState);
    }

    const {
      todos,
      filter
    } = prevState;

    const newTodos = todoModel(todos, event);
    const newFilter = filterModel(filter, event);

    if (newTodos === todos && newFilter === filter) {
      return prevState;
    }

    return {
      todos: newTodos,
      filter: newFilter
    };
  };
};
