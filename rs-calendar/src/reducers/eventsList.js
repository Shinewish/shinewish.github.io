import { combineReducers } from 'redux';

const events = (state = [], action) => {
    switch (action.type) {
    case 'FETCH_EVENTS_SUCCESS':
        return action.response;
    default:
        return state;
    }
};

const isFetchingEvents = (state = false, action) => {
    switch (action.type) {
    case 'FETCH_EVENTS_REQUEST':
        return true;
    case 'FETCH_EVENTS_SUCCESS':
    case 'FETCH_EVENTS_FAILURE':
        return false;
    default:
        return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
    case 'FETCH_EVENTS_FAILURE':
        return action.message;
    case 'FETCH_EVENTS_REQUEST':
    case 'FETCH_EVENTS_SUCCESS':
        return null;
    default:
        return state;
    }
};

export default combineReducers({
    events,
    isFetchingEvents,
    errorMessage,
});

export const getIsFetchingEvents = (state) => state.isFetchingEvents;
export const getErrorMessage = (state) => state.errorMessage;
