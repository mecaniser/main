import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import createSagaMiddleWare from "redux-saga";
import rootSaga from "./sagas/index"

const sagaMiddleware = createSagaMiddleWare()
const store = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension && window.devToolsExtension(),
)(createStore)(rootReducer)


sagaMiddleware.run(rootSaga)

export default store;