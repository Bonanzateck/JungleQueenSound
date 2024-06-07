import { applyMiddleware, createStore, Store, compose } from 'redux';
import { sagaMiddleware } from './middleware';
import { GJIStore } from './IStore';
import gamerootReducer from '../gamereducer';
import rootSaga from '../gamesaga';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


export const configureStore = (initialState?: GJIStore): Store<Partial<GJIStore>> => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(gamerootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;
};

