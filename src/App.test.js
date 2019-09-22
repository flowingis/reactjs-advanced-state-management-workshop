import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import eventBusFactory from './model/eventBus.js';
import eventCreators from './model/eventCreators';
import BusContext from './BusContext';

const DUMMY_STATE = {
  filter: 'All',
  todos: []
};

const eventBus = eventBusFactory((e, state) => DUMMY_STATE);

const contextValue = {
  eventCreators,
  eventBus
};



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusContext.Provider value={contextValue}>
      <App/>
  </BusContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
