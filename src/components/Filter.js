import React, { useContext } from 'react';
import FILTERS from '../model/filters';
import ActionsContext from '../ActionsContext';

export default function Filter({current}) {

    const { changeFilter } = useContext(ActionsContext);

    const filters = FILTERS.map(filter => (
        <li key={filter}>
            <a 
                className={current === filter ? 'selected' : ''} 
                onClick={() => changeFilter(filter)}
                href="#/">{filter}</a>
        </li>
    ));

    return (
        <ul className="filters">
            {filters}
        </ul>
    );
};