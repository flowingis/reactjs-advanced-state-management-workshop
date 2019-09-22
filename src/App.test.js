import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import eventBusFactory from './model/eventBus.js';

const DUMMY_STATE = {
  filter: 'All',
  todos: []
};

const eventBus = eventBusFactory((e, state) => DUMMY_STATE);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App eventBus={eventBus} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
