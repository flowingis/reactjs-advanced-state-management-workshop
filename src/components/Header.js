import React, { useState } from 'react';
import withActions from '../withActions';

function Header({actions}) {

    const [value, setValue] = useState('');
    const { add } = actions;

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            add(e.target.value);
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

export default withActions(Header, 'add');