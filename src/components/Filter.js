import React from 'react';
import { FILTERS } from '../model/filterReducer';

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