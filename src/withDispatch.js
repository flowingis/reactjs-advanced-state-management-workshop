import React, { useContext } from 'react';
import BusContext from './BusContext';

const withDispatch = (Component, ...eventPaths) => {
    return (props) => {
        const {eventBus, eventCreators}  = useContext(BusContext);

        const events = eventPaths.reduce((acc, eventPath) => {
            acc[eventPath] = (...props) => eventBus.dispatch(eventCreators[eventPath](...props)); 
            return acc;
        }, {});
        return <Component events={events} {...props} />;
    };
};

export default withDispatch;
