import React from 'react';
import TodoItem from './TodoItem';

import { ALL, ACTIVE } from '../model/filters';

export default function Todos({
    filter,
    todos,
    onToggleTodo,
    onSubmitTodo,
    onDeleteTodo
}) {

    const visibleTodos = todos.filter(t => {
        if (filter === ALL) {
            return true;
        }

        if (filter === ACTIVE) {
            return !t.completed;
        }

        return t.completed;
    });

    const todoElements = visibleTodos.map(todo => (
        <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDeleteTodo}
            onSubmit={onSubmitTodo}
            onToggle={onToggleTodo} />
    )
    );
    return (
        <ul className="todo-list">
            {todoElements}
        </ul>
    );
};