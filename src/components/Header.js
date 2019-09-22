import React, { useState } from 'react';
import withDispatch from '../withDispatch';

function Header({ events }) {

    const [value, setValue] = useState('');

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            events.add(e.target.value);
            setValue('');
        }
    };

    return (
        <header className="header">
            <h1>todos</h1>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onChange={e => setValue(e.target.value)}
                onKeyPress={onKeyPress}
                value={value} />
        </header>
    );
};

export default withDispatch(Header, 'add');