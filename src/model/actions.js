import uuid from 'uuid/v1';

export default state => {
  const add = text => {
    if (!text) {
      return;
    }

    state.todos = [...state.todos, {
      id: uuid(),
      text,
      completed: false
    }];
  };

  const clearCompleted = () => {
    state.todos = state.todos.filter(t => !t.completed);
  };

  const toggleAll = () => {
    const notCompletedTodos = state.todos.filter(t => !t.completed).length;
    const allCompleted = notCompletedTodos === 0;
    state.todos = state.todos.map(t => ({
      ...t,
      completed: !allCompleted
    }));
  };

  const toggle = id => {
    state.todos = state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  };

  const changeText = (id, text) => {
    state.todos = state.todos.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
  };

  const deleteTodo = id => {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  };

  const changeFilter = filter => {
    state.filter = filter;
  };

  return {
    add,
    changeText,
    delete:deleteTodo,
    toggle,
    toggleAll,
    clearCompleted,
    changeFilter
  };
};
