import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import app from './reducers/app';

const configureStore = () => {
    const middlewares = [thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    const store = createStore(
        app,
        applyMiddleware(...middlewares)
    );

    return store;
};

export default configureStore;
