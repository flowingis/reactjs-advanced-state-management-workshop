import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import filterReducer, { ALL } from './filterReducer';

export const INITIAL_STATE = {
  todos: [],
  filter: ALL
};

const reducers = combineReducers({
    todos: todosReducer,
    filter: filterReducer
});

export default reducers;