import stateUpdaters from './todos';
import { ALL, ACTIVE, COMPLETED } from '../model/filterReducer';

describe('App State Query', () => {
  describe('notCompletedTodos', () => {
    it('should add a todo to the list', () => {
      const result = stateUpdaters.notCompletedTodos([
        {
          text: 'Not completed',
          completed: false
        },
        {
          text: 'Completed',
          completed: true
        }
      ]);
      
      expect(result).toBe(1);
    });    
  });

  describe('allCompletedTodos', () => {
    it('should return true only when every todos is completed', () => {
      const notCompleted = stateUpdaters.allCompletedTodos([
        {
          text: 'Not completed',
          completed: false
        },
        {
          text: 'Completed',
          completed: true
        }
      ]);

      const allCompleted = stateUpdaters.allCompletedTodos([
        {
          text: 'Completed',
          completed: true
        },
        {
          text: 'Completed',
          completed: true
        }
      ]);
      
      expect(notCompleted).toBe(false);
      expect(allCompleted).toBe(true);
    });    
  });

  describe('visibleTodos', () => {
    it('should return only the active todos when an active filter is provided', () => {
      const result = stateUpdaters.visibleTodos([
        {
          id: 2,
          text: 'Not completed',
          completed: false
        },
        {
          id: 4,
          text: 'Completed',
          completed: true
        }
      ], ACTIVE);
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(2);
    });
    
    it('should return only the completed todos when a completed filter is provided', () => {
      const result = stateUpdaters.visibleTodos([
        {
          id: 2,
          text: 'Not completed',
          completed: false
        },
        {
          id: 4,
          text: 'Completed',
          completed: true
        }
      ], COMPLETED);
      
      expect(result.length).toBe(1);
      expect(result[0].id).toBe(4);
    });

    it('should return only the completed todos when a all filter is provided', () => {
      const input = [
        {
          id: 2,
          text: 'Not completed',
          completed: false
        },
        {
          id: 4,
          text: 'Completed',
          completed: true
        }
      ];
      const result = stateUpdaters.visibleTodos(input, ALL);
      
      expect(result).toEqual(input);
    });
  });
});
