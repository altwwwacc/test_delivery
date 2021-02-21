import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas'

// import thunk from 'redux-thunk'

export default function configureStore() {

    const middleware = [];
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, ...middleware));
    const store = createStore(rootReducer, enhancer);
    sagaMiddleware.run(rootSaga, store.dispatch);
    // const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    // sagaMiddleware.run(rootSaga, store.dispatch);
    // if (module.hot) {
    //     module.hot.accept('../reducers', () => {
    //         const nextRootReducer = require('../reducers')
    //         store.replaceReducer(nextRootReducer)
    //     })
    // }
    store.close = () => store.dispatch(END);
    return store
}
