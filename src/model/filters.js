import { EVENT_TYPES } from './eventCreators';

export const ALL = 'All';
export const ACTIVE = 'Active';
export const COMPLETED = 'Completed';

export const FILTERS = [
    ALL,
    ACTIVE,
    COMPLETED
];

const changeFilter = (state, event) => {
    return event.payload;
};

const model = {
    [EVENT_TYPES.FILTER_CHANGED]: changeFilter
};

export default (prevState, event) => {
    if (!event) {
        return ALL;
    }

    const currentModel = model[event.type];

    if (!currentModel) {
        return prevState;
    }

    return currentModel(prevState, event);
};
