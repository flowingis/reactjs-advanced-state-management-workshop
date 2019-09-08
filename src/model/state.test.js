import stateFactory from './state.js';

let state;

describe('state', () => {
    beforeEach(() => {
        state = stateFactory();
    });
    
    test('listeners should be invoked when changing data', () => {
        let counter = 0;
        state.addChangeListener(data => {
            counter++;
        });
        state.changeFilter('Value');
        expect(counter).toBe(1);
    });

    test('listeners should be removed when unsubscribing', () => {
        let counter = 0;
        const unsubscribe = state.addChangeListener(data => {
            counter++;
        });
        unsubscribe();
        state.changeFilter('Value');
        expect(counter).toBe(0);
    });

    test('in listeners state should be immutable', () => {
        state.changeFilter('Value');
        state.addChangeListener(data => {
            expect(() => {
                data.filter = 'Another Value';
            }).toThrow();
        });
    });
});
