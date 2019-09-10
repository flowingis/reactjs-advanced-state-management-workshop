import observableFactory from './observable.js';

let observable;
let state;

describe('observable factory', () => {
  beforeEach(() => {
    state = {
        value: 'dummy'
    };
    observable = observableFactory(state);
  });

  test('listeners should be invoked when changing data', () => {
    let counter = 0;
    observable.addChangeListener(data => {
      counter++;
    });
    observable.value = 'another dummy';
    expect(counter).toBe(1);
  });

  test('listeners should be removed when unsubscribing', () => {
    let counter = 0;
    const unsubscribe = observable.addChangeListener(data => {
      counter++;
    });
    unsubscribe();
    observable.value = 'another dummy';
    expect(counter).toBe(0);
  });

  test('in listeners state should be immutable', () => {
    observable.addChangeListener(data => {
      expect(() => {
        data.name = 'Another Value';
      }).toThrow();
    });
    observable.value = 'another dummy';
  });
});
