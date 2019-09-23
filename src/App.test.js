import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import todosReducer from './model/todosReducer';
import filterReducer from './model/filterReducer';

const reducers = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

const store = createStore(reducers);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
