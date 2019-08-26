import React from 'react';

const FILTERS = [
    'All',
    'Active',
    'Completed'
];

export default function Filter({current, onChangeFilter}) {

    const filters = FILTERS.map(filter => (
        <li key={filter}>
            <a 
                className={current === filter ? 'selected' : ''} 
                onClick={() => onChangeFilter(filter)}
                href="#/">{filter}</a>
        </li>
    ));

    return (
        <ul className="filters">
            {filters}
        </ul>
    );
};