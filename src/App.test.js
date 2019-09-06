import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import stateFactory from './model/state';

const state = stateFactory();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App state={state} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
