import React, { useState, useContext } from 'react';
import ActionsContext from '../ActionsContext';

export default function Header() {

    const [value, setValue] = useState('');
    const { add } = useContext(ActionsContext);

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