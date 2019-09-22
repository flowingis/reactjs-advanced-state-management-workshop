import React, { useContext, useEffect, useState } from 'react';
import clone from 'lodash.clonedeep';
import BusContext from './BusContext';

const freeze = state => Object.freeze(clone(state));

const withState = (Component, query = freeze) => {
    return (props) => {
        const { eventBus } = useContext(BusContext);
        const initialState = query(eventBus.getState());
        const [projection, setState] = useState(initialState);

        useEffect(() => {
            const unsub = eventBus.subscribe(newState => {
                setState(query(newState));
            });
            return unsub;
        }, [eventBus]);

        return <Component state={projection} {...props} />;
    };
};

export default withState;
