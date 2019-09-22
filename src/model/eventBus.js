import clone from 'lodash.clonedeep';

const freeze = state => Object.freeze(clone(state));

export default (model) => {
  let listeners = [];
  let state = model();

  const subscribe = listener => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  const invokeSubscribers = () => {
    const data = freeze(state);
    listeners.forEach(l => l(data));
  };

  const dispatch = event => {
    const newState = model(state, event);

    if (!newState) {
      throw new Error('model should always return a value');
    }

    if (newState === state) {
      return;
    }

    state = newState;

    invokeSubscribers();
  };

  return {
    subscribe,
    dispatch,
    getState: () => freeze(state)
  };
};