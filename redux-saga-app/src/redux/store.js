import { creatStore } from 'redux';
import rootReducer from './reducers/index.js';

const store = creatStore(rootReducer)

export default store;