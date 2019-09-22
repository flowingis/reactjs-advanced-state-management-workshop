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

  const invokeSubscribers = (state, event, oldState) => {
    const data = freeze(state);
    listeners.forEach(listener => {
      listener(
        data,
        event,
        oldState
      );
    });
  };

  const dispatch = event => {
    const newState = model(state, event);

    if (!newState) {
      throw new Error('model should always return a value');
    }

    if (newState === state) {
      return;
    }

    invokeSubscribers(newState, event, state);

    state = newState;
  };

  return {
    subscribe,
    dispatch,
    getState: () => freeze(state)
  };
};
