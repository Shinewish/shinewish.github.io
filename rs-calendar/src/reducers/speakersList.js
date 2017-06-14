import { combineReducers } from 'redux';

const speakers = (state = [], action) => {
    switch (action.type) {
    case 'FETCH_SPEAKERS_SUCCESS':
        return action.response;
    default:
        return state;
    }
};

const isFetchingSpeakers = (state = false, action) => {
    switch (action.type) {
    case 'FETCH_SPEAKERS_REQUEST':
        return true;
    case 'FETCH_SPEAKERS_SUCCESS':
    case 'FETCH_SPEAKERS_FAILURE':
        return false;
    default:
        return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
    case 'FETCH_SPEAKERS_FAILURE':
        return action.message;
    case 'FETCH_SPEAKERS_REQUEST':
    case 'FETCH_SPEAKERS_SUCCESS':
        return null;
    default:
        return state;
    }
};

export default combineReducers({
    speakers,
    isFetchingSpeakers,
    errorMessage,
});

export const getIsFetchingSpeakers = (state) => state.isFetchingSpeakers;
export const getErrorMessage = (state) => state.errorMessage;
