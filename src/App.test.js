import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import observableFactory from './model/observable';
import actionsFactory from './model/actions';
import { ALL } from './model/filters';

const INITIAL_STATE = {
  filter: ALL,
  todos: []
};

const state = observableFactory(INITIAL_STATE);
const actions = actionsFactory(state);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App state={state} actions={actions} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
