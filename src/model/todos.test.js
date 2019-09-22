import todoModel from './todos';
import eventCreators from './eventCreators';

describe('Todos model', () => {
  describe('add', () => {
    it('should add a todo to the list', () => {
      const result = todoModel([], eventCreators.add('Todo'));
      
      expect(result.length).toBe(1);

      const [todo] = result;
      expect(todo.text).toBe('Todo');
      expect(todo.completed).toBe(false);
      expect(todo.id).toBeDefined();
    });    
  });

  describe('clearCompleted', () => {
    it('should remove completed todos', () => {
      const prevState = [
        {
          text: 'Not completed',
          completed: false
        },
        {
          text: 'Completed',
          completed: true
        }
      ];
      
      const result = todoModel(prevState, eventCreators.clearCompleted());
      
      expect(result.length).toBe(1);
      const [todo] = result;
      expect(todo.text).toBe('Not completed');
    });    
  });

  describe('toggleAll', () => {
    it('should set all todos to completed if there is at least one active todo', () => {
      const prevState = [
        {
          text: 'Not completed',
          completed: false
        },
        {
          text: 'Completed',
          completed: true
        }
      ];

      const result = todoModel(prevState, eventCreators.toggleAll());
      
      expect(result.length).toBe(2);
      expect(result[0].completed).toBe(true);
      expect(result[1].completed).toBe(true);
    });   
    
    it('should set all todos to active if all todos are completed', () => {
      const prevState = [
        {
          text: 'Completed',
          completed: true
        },
        {
          text: 'Completed',
          completed: true
        }
      ];

      const result = todoModel(prevState, eventCreators.toggleAll());
      
      expect(result.length).toBe(2);
      expect(result[0].completed).toBe(false);
      expect(result[1].completed).toBe(false);
    });    
  });

  describe('toggle', () => {
    it('should change state of the selected todo', () => {
      const prevState = [
        {
          id: 1,
          text: 'Not completed',
          completed: false
        },
        {
          id: 2,
          text: 'Completed',
          completed: true
        }
      ];

      const result = todoModel(prevState, eventCreators.toggle(1));
      
      expect(result[0].completed).toBe(true);
    });    
  });

  describe('changeText', () => {
    it('should change text of the selected todo', () => {
      const prevState = [
        {
          id: 1,
          text: 'Not completed',
          completed: false
        },
        {
          id: 2,
          text: 'Completed',
          completed: true
        }
      ];

      const result = todoModel(prevState, eventCreators.changeText(1, 'New Text'));

      expect(result[0].text).toBe('New Text');
    });    
  });

  describe('delete', () => {
    it('should remote the selected todo', () => {
      const prevState = [
        {
          id: 1,
          text: 'Not completed',
          completed: false
        },
        {
          id: 2,
          text: 'Completed',
          completed: true
        }
      ];

      const result = todoModel(prevState, eventCreators.delete(1));

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(2);
    });    
  });
});
