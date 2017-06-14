import * as api from '../api';
import { getIsFetchingEvents } from '../reducers/eventsList';
import { getIsFetchingSpeakers } from '../reducers/speakersList';

export const setDate = (date) => (dispatch) => {
    dispatch({
        type: 'SELECT_DATE',
        payload: {
            selDate: date,
        },
    });
};

export const fetchEvents = () => (dispatch, getState) => {
    if (getIsFetchingEvents(getState().eventsList)) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_EVENTS_REQUEST',
    });

    return api.fetchEvents().then(
        response => {
            dispatch({
                type: 'FETCH_EVENTS_SUCCESS',
                response,
            });
        },
        error => {
            dispatch({
                type: 'FETCH_EVENTS_FAILURE',
                message: error.message || 'Something went wrong.',
            });
        }
    );
};

export const fetchTrainers = () => (dispatch, getState) => {
    if (getIsFetchingSpeakers(getState().speakersList)) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_SPEAKERS_REQUEST',
    });

    return api.fetchTrainers().then(
        response => {
            dispatch({
                type: 'FETCH_SPEAKERS_SUCCESS',
                response,
            });
        },
        error => {
            dispatch({
                type: 'FETCH_SPEAKERS_FAILURE',
                message: error.message || 'Something went wrong.',
            });
        }
    );
};

