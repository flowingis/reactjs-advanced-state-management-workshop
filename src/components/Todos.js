import React from 'react';
import TodoItem from './TodoItem';

import todosQueries from '../queries/todos';

export default function Todos({
    filter,
    todos,
    onToggleTodo,
    onSubmitTodo,
    onDeleteTodo
}) {

    const todoElements =  todosQueries
                .visibleTodos(todos, filter)
                .map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={onDeleteTodo}
                            onSubmit={onSubmitTodo}
                            onToggle={onToggleTodo} />
                ));
    return (
        <ul className="todo-list">
            {todoElements}
        </ul>
    );
};